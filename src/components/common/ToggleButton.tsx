import { View } from "react-native";

import { useCreatureType } from "@/hooks/CreatureTypeContext";
import RectangleButton from "./RectangleButton";
import { COLOR } from "@/constants";

const ToggleButton = () => {
  const { selectedType, toggleCreatureType } = useCreatureType();

  const handleToggle = (newType: string) => {
    if (selectedType !== newType) {
      toggleCreatureType();
    }
  };

  const renderButton = (type: string, label: string) => (
    <RectangleButton
      text={label}
      onPress={() => handleToggle(type)}
      className={`w-1/2 ${
        selectedType === type ? "bg-lighter_primary" : "bg-white"
      }`}
      textColor={`${
        selectedType === type ? COLOR.white : COLOR.lighter_primary
      }`}
      textStyle="font-bold"
    />
  );

  return (
    <View className="flex mb-4">
      <View className="h-[49px] border-[0.5px] rounded-2xl flex-row mx-2.5">
        {renderButton("animal", "Động vật")}
        {renderButton("plant", "Thực vật")}
      </View>
    </View>
  );
};

export default ToggleButton;
