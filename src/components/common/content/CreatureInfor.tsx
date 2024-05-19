import { useState } from "react";
import { View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { DocumentData } from "@firebase/firestore";

import { Role, useAuth } from "@/hooks/auth/AuthContext";
import useFormInput from "@/hooks/form/useFormInput";
import { DisplayMode, useModal } from "@/hooks/ModalContext";
import { deleteCreature, updateCreatureInformation } from "@/api/CreatureApi";

import PressableText from "../PressableText";
import ActionButton from "../ActionButton";
import FontText from "../FontText";
import { DialogOption, MessageType } from "../modal/Dialog";

type Props = {
  creatureData: DocumentData;
  tempImageUrl: string | null;
  imageUrl: string | null;
  openModal: () => void;
  setRestart: () => void;
};

const CreatureInfor: React.FC<Props> = ({
  creatureData,
  tempImageUrl,
  imageUrl,
  openModal,
  setRestart,
}) => {
  const { user } = useAuth();
  const {
    NameInput,
    CharacteristicInput,
    BehaviorInput,
    HabitatInput,
    getInputValuesExceptScientificName,
  } = useFormInput({
    name: creatureData.name,
    characteristic: creatureData.characteristic,
    behavior: creatureData.behavior,
    habitat: creatureData.habitat,
  });
  const { show, dataList } = useModal();

  const [isEdit, setIsEdit] = useState(false);

  const provincesText = dataList.join(", ");
  const getRenderInformation = () => {
    let commonData = [
      { id: "Tên", input: NameInput, content: creatureData.name },
      {
        id: "Đặc điểm",
        input: CharacteristicInput,
        content: creatureData.characteristic,
      },
      { id: "Tập tính", input: BehaviorInput, content: creatureData.behavior },
      {
        id: "Môi trường sống",
        input: HabitatInput,
        content: creatureData.habitat,
      },
      {
        id: "Các tỉnh cư trú",
        input: (
          <TouchableOpacity
            className="flex-row items-center bg-[#E9f2eb] rounded-xl"
            onPress={() => show(DisplayMode.Checklist)}
          >
            <TextInput
              multiline
              value={provincesText || creatureData.provinces.join(", ")}
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
        content: creatureData.provinces
          .map((province: string, index: number) => {
            const comma =
              index !== creatureData.provinces.length - 1 ? ", " : ".";
            return `${province}${comma}`;
          })
          .join(""),
      },
    ];

    if (!isEdit) {
      commonData = commonData.filter(
        (data) => data.id !== "Tên khoa học" && data.id !== "Tên"
      );
    }

    if (creatureData.type === "Plants") {
      commonData = commonData.filter((data) => data.id !== "Tập tính");
    }

    return commonData;
  };

  const toggleEdit = async () => {
    if (isEdit) {
      const updatedData = {
        ...getInputValuesExceptScientificName(),
        type: creatureData.type,
        ...(imageUrl === ""
          ? {}
          : !imageUrl
          ? {
              oldImageUrl: creatureData.image_url,
              image_url: "",
            }
          : {
              oldImageUrl: creatureData.image_url,
              image_url: imageUrl as string,
            }),
        provinces: dataList.length !== 0 ? dataList : creatureData.provinces,
      };

      await updateCreatureInformation(
        creatureData.id,
        updatedData,
        creatureData.provinces
      );
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
        const success = await deleteCreature(creatureData);
        if (success) router.back();
      }
    );
  };

  return (
    <View className="flex-1 p-3">
      {/* Infor Header */}
      <View className="flex-row items-center justify-between m-2">
        <PressableText onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </PressableText>

        <View className="w-2/3 flex-row flex-wrap items-center justify-end gap-2 me-4">
          <PressableText className="bg-[#D7E0DD] border border-[#B8C6C1] rounded-md px-2 text-[#1D3A2F]">
            {creatureData.id}
          </PressableText>
          {!isEdit && (
            <PressableText className="bg-[#FFF9F2] border border-[#EECEB0] rounded-md px-2 text-[#CD7B2E]">
              {creatureData.name}
            </PressableText>
          )}
        </View>

        {user?.role === Role.ADMIN && (
          <View className="flex-row items-center gap-2">
            <ActionButton
              type="edit"
              onPress={toggleEdit}
              className="opacity-100"
              isEdit={isEdit}
            />

            <ActionButton
              type="delete"
              onPress={handlerDelete}
              className="border-red-500 bg-red-100"
            />
          </View>
        )}
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
                source={{
                  uri: imageUrl || tempImageUrl || undefined,
                }}
              />
            ) : (
              <Ionicons name="image-outline" size={44} color="green" />
            )}
          </TouchableOpacity>
        )}

        <View className="mb-5">
          {!isEdit ? (
            getRenderInformation().map((item, index) => (
              <View className="mx-1.5 my-2" key={index}>
                <FontText className="font-bold text-lg">
                  {item.id}: <FontText>{item.content}</FontText>
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
        <FontText className="ms-auto me-4 text-gray-500">
          @Sinh vật rừng Việt Nam
        </FontText>
      </ScrollView>
    </View>
  );
};

export default CreatureInfor;
