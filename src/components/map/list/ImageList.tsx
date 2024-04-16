import { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

import { useCreatureType } from "@/hooks/CreatureTypeContext";
import { FontText, Loader } from "../../common";
import {
  Creature,
  getCreaturesFromProvince,
  getDetailOfAllCreatures,
} from "@/api/CreatureApi";

interface Props {
  provinceName: string;
}

const ImageList: React.FC<Props> = ({ provinceName }) => {
  const { selectedType } = useCreatureType();
  const [isLoading, setIsLoading] = useState(true);

  const [creatureDatas, setCreatureDatas] = useState<{
    animalList: Creature[];
    plantList: Creature[];
  }>({
    animalList: [],
    plantList: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const creatureList = await getCreaturesFromProvince(provinceName);
        if (!creatureList) {
          setIsLoading(false);
          return;
        }

        const { animal_list, plant_list } = creatureList;
        const [animalData, plantData] = await Promise.all([
          getDetailOfAllCreatures(animal_list, "Animals"),
          getDetailOfAllCreatures(plant_list, "Plants"),
        ]);

        setCreatureDatas({
          animalList: animalData,
          plantList: plantData,
        });
      } catch (error) {
        console.error("Error fetching creatures:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [provinceName]);

  const getSelectedCreatureData = () =>
    selectedType === "animal"
      ? creatureDatas.animalList
      : creatureDatas.plantList;

  return (
    <View className="flex-1 mb-3">
      {isLoading ? (
        <Loader width={450} height={450} />
      ) : (
        <FlatList
          data={getSelectedCreatureData()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className={`w-[48%] rounded-md items-center bg-primary my-2.5 pb-2.5 ${
                index % 2 === 0 ? "me-auto" : "ms-auto"
              }`}
              onPress={() => {
                router.push({
                  pathname: "(data)/[creatureName]",
                  params: {
                    creatureName: item.id,
                    type: selectedType === "animal" ? "Animals" : "Plants",
                  },
                });
              }}
            >
              <Image
                source={{ uri: item.imageURL }}
                style={{ width: "100%", aspectRatio: 4 / 3, borderRadius: 6 }}
              />
              <FontText className="text-base pt-1.5 text-yellow-300">
                {item.name}
              </FontText>
            </TouchableOpacity>
          )}
          numColumns={2}
          ItemSeparatorComponent={() => (
            <View className="h-0.5 bg-gray-300"></View>
          )}
        />
      )}
    </View>
  );
};

export default ImageList;
