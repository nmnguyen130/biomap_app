import { View } from "react-native";
import { router } from "expo-router";
import { DocumentData } from "@firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { PressableText } from "@/components/common";

interface Props {
  creatureData: DocumentData;
}

const CreatureInforHeader: React.FC<Props> = ({ creatureData }) => {
  return (
    <View className="flex-row items-center justify-between m-2">
      <PressableText
        onPress={() => {
          router.back();
        }}
      >
        <Ionicons name="arrow-back" size={26} color="black" />
      </PressableText>

      <View className="flex-row items-center gap-2">
        <PressableText className="bg-[#D7E0DD] border border-[#B8C6C1] rounded-md px-2 text-[#1D3A2F]">
          {creatureData.id}
        </PressableText>
        <PressableText className="bg-[#FFF9F2] border border-[#EECEB0] rounded-md px-2 text-[#CD7B2E]">
          {creatureData.name}
        </PressableText>
      </View>
    </View>
  );
};

export default CreatureInforHeader;
