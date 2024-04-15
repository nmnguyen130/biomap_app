import { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { DocumentData, getDocs, query, where } from "@firebase/firestore";

import { provinceRef } from "@/utils/firebase";
import { ImageList, Loader, ToggleButton } from "@/components";
import { CreatureTypeProvider } from "@/hooks/CreatureTypeContext";

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
        <View className="flex flex-row items-center justify-center p-1">
          <Text className="text-2xl">{provinceName}</Text>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            className="absolute top-[10px] right-4"
          >
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
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
