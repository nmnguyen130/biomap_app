import { useState } from "react";
import { View, ScrollView } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { DocumentData } from "@firebase/firestore";

import { Role, useAuth } from "@/hooks/auth/AuthContext";
import { deleteCreature } from "@/api/CreatureApi";

import { ActionButton, FontText, PressableText } from "@/components/common";

type Props = {
  creatureData: DocumentData;
};

const CreatureInfor: React.FC<Props> = ({ creatureData }) => {
  const { user } = useAuth();
  const [isEdit, setIsEdit] = useState(false);

  const getRenderInformation = () => {
    const commonData = [
      { id: "Đặc điểm", content: creatureData.characteristic },
      { id: "Tập tính", content: creatureData.behavior },
      { id: "Môi trường sống", content: creatureData.habitat },
      {
        id: "Các tỉnh cư trú",
        content: creatureData.provinces
          .map((province: string, index: number) => {
            const comma =
              index !== creatureData.provinces.length - 1 ? ", " : ".";
            return `${province}${comma}`;
          })
          .join(""),
      },
    ];

    if (creatureData.type === "Plants") {
      return commonData.filter((data) => data.id !== "Tập tính");
    }

    return commonData;
  };

  const toggleEdit = async () => {
    setIsEdit((prev) => !prev);
  };

  const handlerDelete = async () => {
    const success = await deleteCreature(creatureData);
    if (success) router.back();
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
          <PressableText className="bg-[#FFF9F2] border border-[#EECEB0] rounded-md px-2 text-[#CD7B2E]">
            {creatureData.name}
          </PressableText>
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
        <Image
          style={{
            width: "96%",
            aspectRatio: 4 / 3,
            marginVertical: 12,
            borderRadius: 10,
            alignSelf: "center",
          }}
          source={{ uri: creatureData.image_url }}
        />

        <View className="mb-5">
          {getRenderInformation().map((item, index) => (
            <View className="mx-1.5 my-2" key={index}>
              <FontText className="font-bold text-lg">
                {item.id}: <FontText>{item.content}</FontText>
              </FontText>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CreatureInfor;
