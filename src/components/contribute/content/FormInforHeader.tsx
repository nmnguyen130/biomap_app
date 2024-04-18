import { View } from "react-native";
import { router } from "expo-router";
import { DocumentData } from "@firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { PressableText } from "@/components/common";

type Props = {
  formData: DocumentData;
};

const FormInforHeader: React.FC<Props> = ({ formData }) => {
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
        <PressableText
          className={`rounded-md px-2 p-2 border ${
            formData.status === "pending"
              ? "bg-[#FFF9F2] border-[#EECEB0] text-[#CD7B2E]"
              : "bg-[#D7E0DD] border-[#B8C6C1] text-[#1D3A2F]"
          }`}
        >
          {formData.status === "pending"
            ? "Đang chờ duyệt"
            : formData.status === "reject"
            ? "Từ chối"
            : "Đã duyệt"}
        </PressableText>
      </View>
    </View>
  );
};

export default FormInforHeader;
