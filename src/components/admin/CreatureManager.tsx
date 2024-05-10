import { View } from "react-native";

import { ImageList, PressableText, ToggleButton } from "../common";
import { CreatureTypeProvider } from "@/hooks/CreatureTypeContext";
import { router } from "expo-router";

type Props = {
  onClose: () => void;
};

const CreatureManager = ({ onClose }: Props) => {
  return (
    <View className="flex-1 bg-white mx-5">
      <PressableText
        className="ms-auto text-lg font-bold"
        onPress={() => {
          onClose();
          router.replace("(modals)/form");
        }}
      >
        Thêm
      </PressableText>

      <CreatureTypeProvider>
        <ImageList onCloseModal={onClose} />
        <ToggleButton />
      </CreatureTypeProvider>
    </View>
  );
};

export default CreatureManager;
