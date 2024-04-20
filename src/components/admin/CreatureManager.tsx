import { View } from "react-native";

import { ImageList, PressableText, ToggleButton } from "../common";
import { CreatureTypeProvider } from "@/hooks/CreatureTypeContext";

const CreatureManager = () => {
  return (
    <View className="flex-1 bg-white mx-5">
      <PressableText className="ms-auto text-lg font-bold" onPress={() => {}}>
        Thêm
      </PressableText>

      <CreatureTypeProvider>
        <ImageList />
        <ToggleButton />
      </CreatureTypeProvider>
    </View>
  );
};

export default CreatureManager;
