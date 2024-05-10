import { useEffect, useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { DocumentData } from "firebase/firestore";

import { Loader } from "@/components/common";
import { CreatureInforBody, CreatureInforHeader } from "@/components/map";
import {
  getCreatureInfor,
  getProvincesContainCreature,
} from "@/api/CreatureApi";

const CreatureInformation = () => {
  const { creatureName, type } = useLocalSearchParams<{
    creatureName: string;
    type: string;
  }>();

  const [creatureInfor, setCreatureInfor] = useState<DocumentData>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!type || !creatureName) {
          throw new Error("Missing creature name or type from search params");
        }

        const creatureData = await getCreatureInfor(creatureName, type);
        const provinces = await getProvincesContainCreature(creatureName, type);

        if (creatureData && provinces) {
          const mergedData = { ...creatureData, provinces, type };
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
        <View className="flex-1 p-3">
          <CreatureInforHeader creatureData={creatureInfor} />
          <CreatureInforBody creatureData={creatureInfor} />
        </View>
      ) : (
        <Loader width={450} height={450} />
      )}
    </SafeAreaView>
  );
};

export default CreatureInformation;
