import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import {
  CustomBottomSheet,
  FontText,
  PressableText,
  RectangleButton,
} from "@/components/common";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { CreatureManager, FormManager } from "@/components/admin";
import { getNumberFormWithStatus } from "@/api/FormApi";
import { countNummberOfCreature } from "@/api/CreatureApi";

const AdminScreen = () => {
  const creatureModalizeRef = useRef<BottomSheetModal>(null);
  const formModalizeRef = useRef<BottomSheetModal>(null);

  const [counts, setCounts] = useState({
    totalAnimal: 0,
    totalPlant: 0,
    totalForm: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [totalAnimal, totalPlant, totalForm] = await Promise.all([
          countNummberOfCreature("Animals"),
          countNummberOfCreature("Plants"),
          getNumberFormWithStatus(),
        ]);

        setCounts({
          totalAnimal,
          totalPlant,
          totalForm,
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View className="items-center p-2">
          {/* Overview Group */}
          <View className="w-11/12 items-center">
            <FontText className="self-start text-2xl mb-5">Tổng quan</FontText>

            <View className="flex-row items-center justify-between mb-4">
              <View className="bg-white p-4 rounded-lg w-1/2 me-2">
                <FontText className="text-gray-600">Tổng số sinh vật</FontText>
                <FontText className="mt-3">
                  {counts.totalAnimal + counts.totalPlant}
                </FontText>
                <FontText className="bg-[#E9f2eb] text-primary rounded-md px-1 items-center absolute right-3 bottom-4">
                  {counts.totalAnimal + counts.totalPlant - 58}{" "}
                  <Ionicons name="arrow-up" size={10} color="green" />
                </FontText>
              </View>
              <View className="bg-white p-4 rounded-lg w-1/2 ms-2">
                <FontText className="text-gray-600">Tổng số biểu mẫu</FontText>
                <FontText className="mt-3">{counts.totalForm}</FontText>
                <FontText className="bg-[#E9f2eb] text-primary rounded-md px-1 items-center absolute right-3 bottom-4">
                  {counts.totalForm}{" "}
                  <Ionicons name="arrow-up" size={10} color="green" />
                </FontText>
              </View>
            </View>

            <View className="flex-row items-center justify-between mb-4">
              <View className="bg-white p-4 rounded-lg w-1/2 me-2">
                <FontText className="text-gray-600">Tổng số động vật</FontText>
                <FontText className="mt-3">{counts.totalAnimal}</FontText>
                <FontText className="bg-orange-100 text-orange-400 rounded-md px-1 absolute right-3 bottom-4 ">
                  {(
                    (counts.totalAnimal * 100) /
                    (counts.totalAnimal + counts.totalPlant)
                  ).toFixed(2)}
                  {"%"}
                </FontText>
              </View>
              <View className="bg-white p-4 rounded-lg w-1/2 ms-2">
                <FontText className="text-gray-600">Tổng số thực vật</FontText>
                <FontText className="mt-3">{counts.totalPlant}</FontText>
                <FontText className="bg-orange-100 text-orange-400 rounded-md px-1 absolute right-3 bottom-4 ">
                  {(
                    (counts.totalPlant * 100) /
                    (counts.totalAnimal + counts.totalPlant)
                  ).toFixed(2)}
                  {"%"}
                </FontText>
              </View>
            </View>
          </View>

          {/* Button Group */}
          <View className="w-11/12 gap-4 mb-6">
            <RectangleButton
              onPress={() => creatureModalizeRef.current?.present()}
              text="Thông tin sinh vật"
            ></RectangleButton>
            <RectangleButton
              onPress={() => formModalizeRef.current?.present()}
              text="Đóng góp của người dùng"
            ></RectangleButton>
          </View>

          {/* Recent Group */}
          <View className="bg-white w-11/12 p-4 rounded-lg">
            <FontText className="text-lg text-darker_primary mb-4 underline">
              Gần đây nhất
            </FontText>

            <View className="mt-2 mx-2">
              <FontText className="text-primary">
                Sinh vật đã thêm vào:
              </FontText>
              <PressableText className="w-10/12 py-2 px-4 mt-2">
                Hổ (Panthera tigris)
              </PressableText>
            </View>
            <View className="mt-2 mx-2">
              <FontText className="text-primary">
                Biểu mẫu đóng góp đã nhận:
              </FontText>
              <PressableText className="w-10/12 py-2 px-4 mt-2">
                Hổ (Panthera tigris)
              </PressableText>
            </View>
            <View className="mt-2 mx-2">
              <FontText className="text-primary">
                Tiền ủng hộ đã nhận được:
              </FontText>
              <PressableText className="w-10/12 py-2 px-4 mt-2">
                156.000 VND
              </PressableText>
            </View>
          </View>
        </View>
      </ScrollView>

      <CustomBottomSheet bottomsheetRef={creatureModalizeRef} snapPoint={[745]}>
        <CreatureManager onClose={() => creatureModalizeRef.current?.close()} />
      </CustomBottomSheet>

      <CustomBottomSheet bottomsheetRef={formModalizeRef} snapPoint={[745]}>
        <FormManager onClose={() => formModalizeRef.current?.close()} />
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default AdminScreen;
