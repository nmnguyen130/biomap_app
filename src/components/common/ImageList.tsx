import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { router } from "expo-router";

import { useCreatureType } from "@/hooks/CreatureTypeContext";
import FontText from "./FontText";
import Loader from "./Loader";
import {
  Creature,
  getAllCreatures,
  getCreaturesFromProvince,
  getDetailOfAllCreatures,
} from "@/api/CreatureApi";

type Props = {
  provinceName?: string;
};

const ImageList: React.FC<Props> = ({ provinceName = "" }) => {
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
        const creatureList =
          provinceName === ""
            ? await getAllCreatures().then((creatureList) => {
                if (!creatureList) {
                  setIsLoading(false);
                  return;
                }
                const animal_list = creatureList.animal_list.map(
                  (animal) => animal.scientificName
                );
                const plant_list = creatureList.plant_list.map(
                  (plant) => plant.scientificName
                );
                return { animal_list, plant_list };
              })
            : await getCreaturesFromProvince(provinceName);
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
                source={{ uri: item.image_url }}
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
