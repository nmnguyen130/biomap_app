import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DocumentData,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { Loader } from "@/components";
import { CreatureInforBody, CreatureInforHeader } from "@/components/content";
import { db, provinceRef } from "@/utils/firebase";
import { getURLFromCache } from "@/utils/storage";

const CreatureInformation = () => {
  const { creatureName, type, provinceName } = useLocalSearchParams<{
    creatureName: string;
    type: string;
    provinceName: string;
  }>();

  const [creatureInfor, setCreatureInfor] = useState<DocumentData>({});

  const getCreatureInfor = useCallback(async () => {
    try {
      if (!type || !creatureName) {
        throw new Error("Missing creature name or type from search params");
      }

      const creatureRef = doc(db, type, creatureName);
      const snapshot = await getDoc(creatureRef);
      const creatureData = snapshot.data();

      if (!creatureData) {
        console.warn("Creature data not found for:", creatureName);
      } else {
        const id = creatureName;

        const cacheImageURL = await getURLFromCache(`URL_${creatureName}`);
        if (cacheImageURL) {
          creatureData.image_url = cacheImageURL.imageURL;
        }

        return { ...creatureData, id };
      }
    } catch (error) {
      console.error("Error fetching creature information:", error);
    }
  }, [creatureName, type]);

  const getProvincesContainCreature = useCallback(async () => {
    try {
      const field = type === "Animals" ? "animal_list" : "plant_list";
      const q = query(
        provinceRef,
        where(field, "array-contains", creatureName)
      );
      const snapshot = await getDocs(q);
      let provinces = snapshot.docs.map((doc) => ({
        name: doc.data().name,
      }));

      return provinces;
    } catch (error) {
      console.error("Error fetching provinces contain creature:", error);
    }
  }, [creatureName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const creatureData = await getCreatureInfor();
        const provinces = await getProvincesContainCreature();

        if (creatureData && provinces) {
          const mergedData = { ...creatureData, provinces };
          setCreatureInfor(mergedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {Object.keys(creatureInfor).length > 0 ? (
        <View className="flex-1 p-[10px]">
          <CreatureInforHeader
            creatureData={creatureInfor}
            provinceName={provinceName}
          />
          <CreatureInforBody creatureData={creatureInfor} />
        </View>
      ) : (
        <Loader width={450} height={450} />
      )}
    </SafeAreaView>
  );
};

export default CreatureInformation;
