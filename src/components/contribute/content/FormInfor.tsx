import { useState } from "react";
import { View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { DocumentData } from "@firebase/firestore";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { DisplayMode, useModal } from "@/hooks/ModalContext";
import useFormInput from "@/hooks/form/useFormInput";
import { deleteForm, updateFormInformation } from "@/api/FormApi";
import { Role, useAuth } from "@/hooks/auth/AuthContext";

import { ActionButton, FontText, PressableText } from "@/components/common";
import { DialogOption, MessageType } from "@/components/common/modal/Dialog";

interface Props {
  formData: DocumentData;
  tempImageUrl: string | null;
  imageUrl: string | null;
  openModal: () => void;
  setRestart: () => void;
}

const FormInfor: React.FC<Props> = ({
  formData,
  tempImageUrl,
  imageUrl,
  openModal,
  setRestart,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const { show, dataList } = useModal();
  const { user } = useAuth();

  const [state, setState] = useState("hidden");

  const toggleState = () => {
    state === "hidden" ? setState("") : setState("hidden");
  };

  const provincesText = dataList.join(", ");
  const {
    ScientificNameInput,
    NameInput,
    CharacteristicInput,
    BehaviorInput,
    HabitatInput,
    getInputValues,
  } = useFormInput({
    scientificName: formData.scientificName,
    name: formData.name,
    characteristic: formData.characteristic,
    behavior: formData.behavior,
    habitat: formData.habitat,
  });

  const getRenderInformation = () => {
    const commonData = [
      {
        id: "Tên khoa học",
        input: ScientificNameInput,
        content: formData.scientificName,
      },
      { id: "Tên", input: NameInput, content: formData.name },
      {
        id: "Đặc điểm",
        input: CharacteristicInput,
        content: formData.characteristic,
      },
      { id: "Tập tính", input: BehaviorInput, content: formData.behavior },
      { id: "Môi trường sống", input: HabitatInput, content: formData.habitat },
      {
        id: "Các tỉnh cư trú",
        input: (
          <TouchableOpacity
            className="flex-row items-center bg-[#E9f2eb] rounded-xl"
            onPress={() => show(DisplayMode.Checklist)}
          >
            <TextInput
              multiline
              value={provincesText || formData.provinces.join(", ")}
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
        ),
        content: formData.provinces.join(", "),
      },
    ];

    if (formData.type === "plant") {
      return commonData.filter((data) => data.id !== "Tập tính");
    }

    return commonData;
  };

  const toggleEdit = async () => {
    if (isEdit) {
      const updatedData = {
        ...getInputValues(),
        ...(imageUrl === ""
          ? {}
          : !imageUrl
          ? {
              oldImageUrl: formData.imageUrl,
              imageUrl: "",
            }
          : {
              oldImageUrl: formData.imageUrl,
              imageUrl: imageUrl as string,
            }),
        provinces: dataList.length !== 0 ? dataList : formData.provinces,
      };

      await updateFormInformation(formData.id, updatedData);
      setRestart();
    }
    setIsEdit((prev) => !prev);
  };

  const handlerDelete = async () => {
    show(
      DisplayMode.Dialog,
      {
        dialogOption: DialogOption.Double,
        dialogType: MessageType.Error,
        title: "Cảnh báo!",
        content: "Bạn có chắc chắn muốn xóa không?",
      },
      async () => {
        const success = await deleteForm(formData);
        if (success) router.replace("(tabs)/contribute");
      }
    );
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
            onPress={() => (user?.role === Role.ADMIN ? toggleState() : {})}
          >
            {formData.status === "pending"
              ? "Đang chờ duyệt"
              : formData.status === "reject"
              ? "Từ chối"
              : "Đã duyệt"}
          </PressableText>

          <View
            className={`${state} absolute border w-1/2 items-center bg-white rounded-lg top-11 -right-2.5 z-10 p-3 gap-2`}
          >
            <TouchableOpacity
              onPress={toggleState}
              className="rounded-md w-11/12 py-3 bg-primary items-center"
            >
              <FontText className="text-white">Chấp nhận</FontText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleState}
              className="rounded-md w-11/12 py-3 bg-red-500 items-center"
            >
              <FontText className="text-white">Từ chối</FontText>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          <ActionButton
            type="edit"
            onPress={toggleEdit}
            className="opacity-100"
            isEdit={isEdit}
          />

          {user?.role === Role.USER && (
            <ActionButton
              type="delete"
              onPress={handlerDelete}
              className="border-red-500 bg-red-100"
            />
          )}
        </View>
      </View>

      {/* Body */}
      <ScrollView className="flex-1">
        {(isEdit || tempImageUrl !== "") && (
          <TouchableOpacity
            disabled={!isEdit}
            onPress={openModal}
            className="w-[96%] aspect-4/3 border-primary border-2 rounded-lg self-center items-center justify-center"
          >
            {tempImageUrl || imageUrl ? (
              <Image
                style={{
                  width: "100%",
                  aspectRatio: 4 / 3,
                  marginVertical: 12,
                  borderRadius: 6,
                  alignSelf: "center",
                }}
                source={{ uri: imageUrl || tempImageUrl || undefined }}
              />
            ) : (
              <Ionicons name="image-outline" size={44} color="green" />
            )}
          </TouchableOpacity>
        )}

        <View className="mb-5">
          {!isEdit ? (
            getRenderInformation().map((item, index) => (
              <View key={index} className="m-2 gap-2">
                <FontText key={index} className="font-bold text-lg">
                  {item.id}:{" "}
                  <FontText>
                    {item.id === "Các tỉnh cư trú"
                      ? provincesText || item.content
                      : item.content}
                  </FontText>
                </FontText>
              </View>
            ))
          ) : (
            <View className="m-2 gap-2">
              {getRenderInformation().map((item, index) => (
                <View key={index} className="gap-2">
                  <FontText className="font-bold text-lg">{item.id}: </FontText>
                  <View className="bg-[#E9f2eb] rounded-xl py-2 px-4">
                    {item.input}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default FormInfor;
