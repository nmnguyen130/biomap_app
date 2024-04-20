import { doc, getDoc, query, where, getDocs } from "@firebase/firestore";
import { getDownloadURL, ref } from "@firebase/storage";

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
  imageURL: string;
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
    console.error("Error fetching creatures:", error);
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
      })),
      plantSnapshot.docs.map((doc) => ({
        name: doc.data().name,
        scientificName: doc.id,
      })),
    ]);
    return { animal_list: animalList, plant_list: plantList };
  } catch (error) {
    console.error("Error fetching creatures:", error);
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
              imageURL: imageUrl,
            })
          );

          return {
            id: data,
            name: creatureData.name,
            imageURL: imageUrl,
          };
        }
      }
      return { id: "", name: "", imageURL: "" };
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
        creatureData.image_url = cacheImageURL.imageURL;
      }

      return creatureData;
    }
  } catch (error) {
    console.error("Error fetching creature information:", error);
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
    console.error("Error fetching provinces contain creature:", error);
  }
};
