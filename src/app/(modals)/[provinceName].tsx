import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { DocumentData, getDocs, query, where } from "@firebase/firestore";

import { provinceRef } from "@/utils/firebase";
import { ImageList, Loader, ToggleButton } from "@/components";
import { CreatureTypeProvider } from "@/hooks/CreatureTypeContext";
import { FontText, PressableText } from "@/components/common";

const CreatureModal = () => {
  const { provinceName } = useLocalSearchParams<{ provinceName: string }>();

  const [creatureList, setCreatureList] = useState<DocumentData>({});

  const getCreaturesFromProvince = useMemo(() => {
    return async () => {
      const q = query(provinceRef, where("name", "==", provinceName));
      const snapshot = await getDocs(q);

      const { animal_list, plant_list } = snapshot.docs[0]?.data();
      setCreatureList({ animal_list, plant_list });
    };
  }, [provinceName]);

  useEffect(() => {
    getCreaturesFromProvince();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View className="flex-1 bg-white mx-5">
        <View className="flex-row items-center justify-center p-1 pb-2">
          <FontText className="text-2xl me-auto">{provinceName}</FontText>
          <PressableText onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="black" />
          </PressableText>
        </View>

        {Object.keys(creatureList).length !== 0 ? (
          <>
            <CreatureTypeProvider>
              <ImageList
                creatureList={creatureList}
                provinceName={provinceName}
              />
              <ToggleButton />
            </CreatureTypeProvider>
          </>
        ) : (
          <Loader width={450} height={450} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CreatureModal;
