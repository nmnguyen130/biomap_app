import { View, ScrollView } from "react-native";
import { DocumentData } from "@firebase/firestore";

import { Image } from "expo-image";
import { FontText } from "@/components/common";

interface Props {
  formData: DocumentData;
}

const FormInforBody: React.FC<Props> = ({ formData }) => {
  const getRenderInformation = () => {
    const commonData = [
      { id: "Tên khoa học", content: formData.scientificName },
      { id: "Tên", content: formData.name },
      {
        id: "Thuộc",
        content: formData.type === "animal" ? "Động vật" : "Thực vật",
      },
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

  return (
    <ScrollView className="flex-1">
      {formData.imageUrl && (
        <Image
          style={{
            width: "96%",
            aspectRatio: 4 / 3,
            marginVertical: 12,
            borderRadius: 10,
            alignSelf: "center",
          }}
          source={{ uri: formData.imageUrl }}
        />
      )}
      <View className="mb-5">
        {getRenderInformation().map((item, index) => (
          <View key={index} className="mx-1 my-2">
            <FontText className="font-bold text-lg">
              {item.id}: <FontText>{item.content}</FontText>
            </FontText>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default FormInforBody;
