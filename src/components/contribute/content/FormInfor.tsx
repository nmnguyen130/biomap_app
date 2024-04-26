import { View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { DocumentData } from "@firebase/firestore";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { Image } from "expo-image";
import { router } from "expo-router";
import { FontText, PressableText } from "@/components/common";
import { DisplayMode, useModal } from "@/hooks/ModalContext";
import { deleteForm } from "@/api/FormApi";
import { useState } from "react";

interface Props {
  formData: DocumentData;
  openModal: () => void;
  imageUrl: string | null;
  updateFormInfor: (value: DocumentData) => void;
}

const FormInforBody: React.FC<Props> = ({
  formData,
  openModal,
  imageUrl,
  updateFormInfor,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const { show, dataList } = useModal();

  const provincesText = dataList.join(", ");

  const getRenderInformation = () => {
    const commonData = [
      { id: "Tên khoa học", content: formData.scientificName },
      { id: "Tên", content: formData.name },
      { id: "Đặc điểm", content: formData.characteristic },
      { id: "Tập tính", content: formData.behavior },
      { id: "Môi trường sống", content: formData.habitat },
      {
        id: "Các tỉnh cư trú",
        content: formData.provinces
          .map((province: string, index: number) => {
            const comma = index !== formData.provinces.length - 1 ? ", " : ".";
            return `${province}${comma}`;
          })
          .join(""),
      },
    ];

    if (formData.type === "plant") {
      return commonData.filter((data) => data.id !== "Tập tính");
    }

    return commonData;
  };

  const toggleEdit = () => {
    if (isEdit) {
      console.log("Send to firebase");
      // await updateFormData(formInfor);
    }
    setIsEdit((prev) => !prev);
  };

  const handlerDelete = async () => {
    const success = await deleteForm(formData);
    if (success) router.back();
  };

  return (
    <>
      {/* Header */}
      <View className="flex-row items-center justify-between m-2">
        <PressableText onPress={() => router.back()}>
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
            onPress={toggleEdit}
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

      {/* Body */}
      <ScrollView className="flex-1">
        {formData.imageUrl && (
          <TouchableOpacity disabled={!isEdit} onPress={openModal}>
            <Image
              style={{
                width: "96%",
                aspectRatio: 4 / 3,
                marginVertical: 12,
                borderRadius: 10,
                alignSelf: "center",
              }}
              source={{ uri: imageUrl || formData.imageUrl }}
            />
          </TouchableOpacity>
        )}
        <View className="mb-5">
          {getRenderInformation().map((item, index) => (
            <View key={index} className="m-2 gap-2">
              {!isEdit ? (
                <FontText className="font-bold text-lg">
                  {item.id}:{" "}
                  <FontText>
                    {item.id === "Các tỉnh cư trú"
                      ? provincesText || item.content
                      : item.content}
                  </FontText>
                </FontText>
              ) : (
                <>
                  <FontText className="font-bold">{item.id}: </FontText>
                  {item.id === "Các tỉnh cư trú" ? (
                    <TouchableOpacity
                      className="flex-row items-center py-2 px-4 bg-[#E9f2eb] rounded-xl"
                      onPress={() => show(DisplayMode.Checklist)}
                    >
                      <TextInput
                        multiline
                        value={provincesText || item.content}
                        editable={false}
                        className="flex-1 text-gray-800"
                        placeholder="Tỉnh"
                      />
                      <MaterialIcons
                        name="keyboard-arrow-right"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  ) : (
                    <TextInput className="py-2 px-4 bg-[#E9f2eb] rounded-xl">
                      {item.content}
                    </TextInput>
                  )}
                </>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default FormInforBody;
