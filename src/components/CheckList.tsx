import { useState } from "react";
import { View, FlatList, Modal, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ProvinceTag from "./ProvinceTag";
import Button from "./Button";
import { provinces } from "@/constants/data/ProvincesData";
import { AuthInput } from "./auth";

interface Props {
  isVisible: boolean;
  onClose: (selectedProvinces: string[]) => void;
  provincesList?: string[];
}

const CheckList: React.FC<Props> = ({ isVisible, onClose, provincesList }) => {
  const [searchContent, setSearchContent] = useState("");
  const [selectedProvinces, setSelectedProvinces] = useState(
    new Set<string>(provincesList)
  );

  const filteredProvinces = provinces.filter((province) =>
    province.toLowerCase().startsWith(searchContent.toLowerCase())
  );

  const handleToggleProvince = (provinceName: string) => {
    const updatedProvinces = new Set(selectedProvinces);
    if (updatedProvinces.has(provinceName)) {
      updatedProvinces.delete(provinceName);
    } else {
      updatedProvinces.add(provinceName);
    }
    setSelectedProvinces(updatedProvinces);
  };

  const handleFinish = () => {
    onClose(Array.from(selectedProvinces));
  };

  if (!isVisible) return null;

  return (
    <>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        ]}
      />
      <Modal transparent visible={isVisible} animationType="fade">
        <View className="flex-1 justify-center items-center mx-8 my-16 bg-white rounded-xl">
          <AuthInput
            leftIcon={<MaterialIcons name="search" size={24} color="black" />}
            label="Nhập tỉnh muốn tìm kiếm"
            onChangeText={(value) => setSearchContent(value)}
          />

          <FlatList
            data={filteredProvinces}
            renderItem={({ item }) => (
              <ProvinceTag
                provinceName={item}
                onPress={() => handleToggleProvince(item)}
                isSelected={selectedProvinces.has(item)}
              />
            )}
            keyExtractor={(item) => item}
            windowSize={10}
            removeClippedSubviews={true}
            initialNumToRender={20}
          />

          <View className="w-full items-center my-2">
            <Button width="half" onPress={handleFinish} value="Xong" />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CheckList;
