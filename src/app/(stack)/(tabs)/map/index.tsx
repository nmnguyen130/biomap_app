import { useEffect, useRef, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomBottomSheet, FontText, Selector } from "@/components/common";
import { MapGesture, MapPath } from "@/components/map";
import { FilterButton, SearchInput, SearchResults } from "@/components/search";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SelectItem } from "@/components/common/input/Selector";
import { getAllCreatures } from "@/api/CreatureApi";

export type SearchResultType = "all" | "animal" | "plant";

const MapScreen = () => {
  const { width, height } = useWindowDimensions();

  const [input, setInput] = useState<string>("");
  const [resultType, setResultType] = useState<SearchResultType>("all");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [creatureList, setCreatureList] = useState<{
    animalList: { name: string; scientificName: string }[];
    plantList: { name: string; scientificName: string }[];
  }>({
    animalList: [],
    plantList: [],
  });

  const modalizeRef = useRef<BottomSheetModal>(null);

  const handleInputChange = (value: string) => {
    setInput(value);
    setShowResults(value.trim().length > 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const creatures = await getAllCreatures();
        if (creatures) setCreatureList(creatures);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchData();
  }, []);

  const filteredCreatureList =
    resultType === "all"
      ? [...creatureList.animalList, ...creatureList.plantList]
      : resultType === "animal"
      ? creatureList.animalList
      : creatureList.plantList;

  const filteredResults = filteredCreatureList.filter((creature) =>
    creature.name.toLowerCase().startsWith(input.trim().toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapGesture width={width} height={height}>
        <MapPath width={width} height={height} />
      </MapGesture>

      <View className="flex-row items-center bg-white rounded-full mx-2 absolute top-10">
        <SearchInput onChangeText={handleInputChange} value={input} />
        <FilterButton onPress={() => modalizeRef.current?.present()} />
      </View>

      {showResults && (
        <View className="w-full h-2/3 absolute top-24 mt-1">
          <SearchResults
            type={resultType}
            searchResultArray={filteredResults}
          />
        </View>
      )}

      <CustomBottomSheet bottomsheetRef={modalizeRef} snapPoint={[220]}>
        <FontText className="border-b border-gray-300 w-full text-center py-3 text-lg font-bold">
          Danh sách
        </FontText>
        <Selector
          onValueChange={(value) => {
            setResultType(value as SearchResultType);
            modalizeRef.current?.close();
          }}
          defaultValue={resultType}
        >
          <SelectItem name="Tất cả" value="all" />
          <SelectItem name="Động vật" value="animal" />
          <SelectItem name="Thực vật" value="plant" />
        </Selector>
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default MapScreen;
