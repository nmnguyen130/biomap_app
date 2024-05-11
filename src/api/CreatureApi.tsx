import {
  DocumentData,
  arrayUnion,
  arrayRemove,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "@firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "@firebase/storage";

import {
  animalRef,
  db,
  plantRef,
  provinceRef,
  storage,
} from "@/utils/firebase";
import { getURLFromCache, saveURLToCache } from "@/utils/storage";

type CreatureLists = {
  animal_list: string[];
  plant_list: string[];
};

export type Creature = {
  id: string;
  name: string;
  characteristic?: string;
  behavior?: string;
  habitat?: string;
  image_url: string;
  type?: string;
};

type CreatureDataUpdate = {
  name: string;
  type: string;
  oldImageUrl?: string;
  image_url?: string;
  provinces: string[];
};

export const addCreature = async (data: Creature, provinces: string[]) => {
  try {
    const table = data.type === "animal" ? "Animals" : "Plants";
    const imageUrl = `${data.type}/${data.id}.${data.image_url
      .split(".")
      .pop()}`;
    const fieldToUpdate = data.type === "animal" ? "animal_list" : "plant_list";

    await Promise.all([
      uploadImageToFirebase(data.type, data.id, data.image_url),
      setDoc(doc(db, table, data.id), { ...data, image_url: imageUrl }),
      addCreatureInProvince(data.id, fieldToUpdate, provinces),
    ]);

    return { success: true };
  } catch (error) {
    return { success: false, msg: (error as Error).message };
  }
};

export const getCreaturesFromProvince = async (
  provinceName: string
): Promise<CreatureLists | undefined> => {
  try {
    const q = query(provinceRef, where("name", "==", provinceName));
    const snapshot = await getDocs(q);

    const data = snapshot.docs[0].data();
    return data
      ? { animal_list: data.animal_list, plant_list: data.plant_list }
      : undefined;
  } catch (error) {
    console.error(
      "Error fetching creatures from province:",
      (error as Error).message
    );
    throw error;
  }
};

export const getAllCreatures = async () => {
  try {
    const animalSnapshot = await getDocs(animalRef);
    const plantSnapshot = await getDocs(plantRef);

    const [animalList, plantList] = await Promise.all([
      animalSnapshot.docs.map((doc) => ({
        name: doc.data().name,
        scientificName: doc.id,
        type: "Animals",
      })),
      plantSnapshot.docs.map((doc) => ({
        name: doc.data().name,
        scientificName: doc.id,
        type: "Plants",
      })),
    ]);
    return { animal_list: animalList, plant_list: plantList };
  } catch (error) {
    console.error("Error fetching all creatures:", (error as Error).message);
    throw error;
  }
};

export const getDetailOfAllCreatures = async (
  creatureList: string[],
  table: string
): Promise<Creature[]> => {
  const results = await Promise.all(
    creatureList.map(async (data: string) => {
      const cachedImageURL = await getURLFromCache(`URL_${data}`);

      if (cachedImageURL) {
        return cachedImageURL;
      } else {
        const creatureRef = doc(db, table, data);
        const snapshot = await getDoc(creatureRef);
        const creatureData = snapshot.data();

        if (creatureData) {
          const imageRef = ref(storage, `${creatureData.image_url}`);
          const imageUrl = await getDownloadURL(imageRef);

          saveURLToCache(
            `URL_${data}`,
            JSON.stringify({
              id: data,
              name: creatureData.name,
              image_url: imageUrl,
            })
          );

          return {
            id: data,
            name: creatureData.name,
            image_url: imageUrl,
          };
        }
      }
      return { id: "", name: "", image_url: "" };
    })
  );

  return results.filter(Boolean);
};

export const getCreatureInfor = async (creatureName: string, type: string) => {
  try {
    const creatureRef = doc(db, type, creatureName);
    const snapshot = await getDoc(creatureRef);
    const creatureData = snapshot.data();

    if (!creatureData) {
      console.warn("Creature data not found for:", creatureName);
    } else {
      creatureData.id = creatureName;

      const cacheImageURL = await getURLFromCache(`URL_${creatureName}`);
      if (cacheImageURL) {
        creatureData.image_url = cacheImageURL.image_url;
      } else {
        const imageRef = ref(storage, `${creatureData.image_url}`);
        creatureData.image_url = await getDownloadURL(imageRef);
      }

      return creatureData;
    }
  } catch (error) {
    console.error(
      "Error fetching creature information:",
      (error as Error).message
    );
    throw error;
  }
};

export const getProvincesContainCreature = async (
  creatureName: string,
  type: string
): Promise<string[] | undefined> => {
  try {
    const field = type === "Animals" ? "animal_list" : "plant_list";
    const q = query(provinceRef, where(field, "array-contains", creatureName));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data().name as string);
  } catch (error) {
    console.error(
      "Error fetching provinces contain creature:",
      (error as Error).message
    );
    throw error;
  }
};

export const updateCreatureInformation = async (
  id: string,
  data: CreatureDataUpdate,
  initialProvinces: string[]
) => {
  try {
    const docRef = doc(db, data.type, id);
    if (data.oldImageUrl || data.oldImageUrl === "") {
      if (data.oldImageUrl !== "") deleteImage(data.oldImageUrl);
      delete data.oldImageUrl;
      if (data.image_url) {
        const storageFolder = data.type === "Animals" ? "animal" : "plant";
        await uploadImageToFirebase(storageFolder, id, data.image_url);
      }
    }
    const field = data.type === "Animals" ? "animal_list" : "plant_list";
    deleteCreatureInProvince(id, field, initialProvinces);
    addCreatureInProvince(id, field, data.provinces);
    await updateDoc(docRef, { ...data });
    return { success: true };
  } catch (error) {
    return { success: false, msg: (error as Error).message };
  }
};

export const deleteCreature = async (creatureData: DocumentData) => {
  try {
    await deleteDoc(doc(db, creatureData.type, creatureData.id));
    if (creatureData.image_url) {
      deleteImage(creatureData.image_url);
    }

    const fieldToDelete =
      creatureData.type === "Animals" ? "animal_list" : "plant_list";

    deleteCreatureInProvince(
      creatureData.id,
      fieldToDelete,
      creatureData.provinces
    );

    return true;
  } catch (error) {
    console.error("Error deleting form:", (error as Error).message);
    return false;
  }
};

const addCreatureInProvince = async (
  id: string,
  fieldToUpdate: string,
  provinces: string[]
) => {
  const promises = provinces.map(async (province) => {
    const q = query(provinceRef, where("name", "==", province));
    const snapshot = await getDocs(q);
    const provinceId = snapshot.docs[0].id;

    return updateDoc(doc(db, "Provinces", provinceId), {
      [fieldToUpdate]: arrayUnion(id),
    });
  });

  await Promise.all(promises);
};

const deleteCreatureInProvince = async (
  id: string,
  fieldToDelete: string,
  provinces: string[]
) => {
  const promises = provinces.map(async (province) => {
    const q = query(provinceRef, where("name", "==", province));
    const snapshot = await getDocs(q);
    const provinceId = snapshot.docs[0].id;

    return updateDoc(doc(db, "Provinces", provinceId), {
      [fieldToDelete]: arrayRemove(id),
    });
  });

  await Promise.all(promises);
};

const uploadImageToFirebase = async (
  type: string | undefined,
  scientificName: string,
  imageURL: string
) => {
  const imageRef = ref(
    storage,
    `${type}/${scientificName}.${imageURL.split(".").pop()}`
  );

  try {
    const response = await fetch(imageURL);
    const blob = await response.blob();

    const uploadTask = uploadBytesResumable(imageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: Handle progress updates if needed
        },
        (error) => {
          reject(error);
        },
        async () => {
          resolve(true);
        }
      );
    });
  } catch (error) {
    console.error("Error uploading image:", (error as Error).message);
    throw error;
  }
};

const deleteImage = (imageUrl: string) => {
  try {
    const imageRef = ref(storage, imageUrl);
    deleteObject(imageRef);
  } catch (error) {
    console.error("Error deleting image:", (error as Error).message);
  }
};
