import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { CreatureTypeProvider } from "@/hooks/CreatureTypeContext";
import {
  FontText,
  ImageList,
  PressableText,
  ToggleButton,
} from "@/components/common";

const CreatureModal = () => {
  const { provinceName = "" } = useLocalSearchParams<{
    provinceName: string;
  }>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View className="flex-1 bg-white mx-5">
        <View className="flex-row items-center justify-center p-1 pb-2">
          <FontText className="text-2xl me-auto">{provinceName}</FontText>
          <PressableText onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="black" />
          </PressableText>
        </View>

        <CreatureTypeProvider>
          <ImageList provinceName={provinceName} />
          <ToggleButton />
        </CreatureTypeProvider>
      </View>
    </SafeAreaView>
  );
};

export default CreatureModal;
