import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { DocumentData } from "@firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  creatureData: DocumentData;
}

const CreatureInforHeader: React.FC<Props> = ({ creatureData }) => {
  return (
    <View className="flex-row items-center justify-between m-2">
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <Ionicons name="arrow-back" size={26} color="black" />
      </TouchableOpacity>

      <View className="flex-row items-center gap-2">
        <TouchableOpacity className="bg-[#D7E0DD] border border-[#B8C6C1] border-solid rounded-md">
          <Text className="mx-2 text-[#1D3A2F]">{creatureData.id}</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#FFF9F2] border border-[#EECEB0] border-solid rounded-md">
          <Text className="mx-2 text-[#CD7B2E]">{creatureData.name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatureInforHeader;
