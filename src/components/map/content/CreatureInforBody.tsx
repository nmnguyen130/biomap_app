import { View, ScrollView } from "react-native";
import { DocumentData } from "@firebase/firestore";

import { Image } from "expo-image";
import { FontText } from "@/components/common";

interface Props {
  creatureData: DocumentData;
}

const CreatureInforBody: React.FC<Props> = ({ creatureData }) => {
  const getRenderInformation = () => {
    return [
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
  };

  return (
    <ScrollView className="flex-1">
      <View className="items-center">
        <Image
          style={{
            width: "96%",
            aspectRatio: 4 / 3,
            marginVertical: 12,
            borderRadius: 10,
          }}
          source={{ uri: creatureData.image_url }}
        />

        <View className="mb-5">
          {getRenderInformation().map((item) => (
            <View className="mx-1.5 my-2">
              <FontText className="font-bold text-lg">
                {item.id}: <FontText>{item.content}</FontText>
              </FontText>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CreatureInforBody;
