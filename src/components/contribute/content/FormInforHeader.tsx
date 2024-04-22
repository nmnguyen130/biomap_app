import { TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { DocumentData } from "@firebase/firestore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { PressableText } from "@/components/common";
import { useState } from "react";
import { deleteForm } from "@/api/FormApi";

type Props = {
  formData: DocumentData;
};

const FormInforHeader: React.FC<Props> = ({ formData }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handlerDelete = async () => {
    const success = await deleteForm(formData);
    if (success) router.back();
  };

  return (
    <View className="flex-row items-center justify-between m-2">
      <PressableText
        onPress={() => {
          router.back();
        }}
      >
        <Ionicons name="arrow-back" size={26} color="black" />
      </PressableText>

      <View className="flex-1 flex-row items-center justify-end gap-2 me-4">
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
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => setIsEdit((prev) => !prev)}
          className="p-2 rounded-lg border opacity-100"
          style={
            isEdit
              ? {
                  backgroundColor: "rgb(220, 252, 231)",
                  borderColor: "green",
                }
              : { backgroundColor: "rgb(243, 244, 246)" }
          }
        >
          {isEdit ? (
            <MaterialCommunityIcons name="check" size={20} color="green" />
          ) : (
            <MaterialCommunityIcons
              name="wrench-outline"
              size={20}
              color="black"
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-lg border border-red-500 bg-red-100"
          onPress={handlerDelete}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={20}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormInforHeader;
