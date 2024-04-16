import { doc, getDoc, query, where, getDocs } from "@firebase/firestore";
import { getDownloadURL, ref } from "@firebase/storage";

import { db, provinceRef, storage } from "@/utils/firebase";
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
