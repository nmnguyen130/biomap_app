import { View, Text, FlatList } from "react-native";
import { DocumentData } from "@firebase/firestore";

import { Image } from "expo-image";

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
        content: creatureData.provinces.map(
          (province: { name: string }, index: number) => {
            const comma =
              index !== creatureData.provinces.length - 1 ? ", " : ".";
            return `${province.name}${comma}`;
          }
        ),
      },
    ];
  };

  return (
    <View className="flex-1 items-center">
      <Image
        style={{
          width: "96%",
          height: "30%",
          marginVertical: 12,
          borderRadius: 10,
        }}
        source={{ uri: creatureData.image_url }}
      />

      <FlatList
        data={getRenderInformation()}
        renderItem={({ item }) => (
          <View className="mx-1.5 my-2">
            <Text className="font-bold text-lg" style={{ fontFamily: "PTSer" }}>
              {item.id}: <Text className="font-normal">{item.content}</Text>
            </Text>
          </View>
        )}
        contentContainerStyle={{ flexGrow: 1, zIndex: 10000 }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CreatureInforBody;
