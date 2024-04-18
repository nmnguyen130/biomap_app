import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  provinceName: string;
  onPress: () => void;
  isSelected: boolean;
};

const ProvinceTag: React.FC<Props> = ({
  provinceName,
  onPress,
  isSelected,
}) => {
  const checkIcon = useMemo(
    () =>
      isSelected && (
        <View className="bg-primary absolute -top-px right-0 px-2 rounded-bl-2xl rounded-tr-md">
          <MaterialIcons name="check" size={20} color="white" />
        </View>
      ),
    [isSelected]
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      className="justify-center items-center rounded-lg border-primary py-2 px-16 my-2"
      style={{ borderWidth: isSelected ? 2 : 1 }}
    >
      <Text className="text-lg">{provinceName}</Text>
      {checkIcon}
    </TouchableOpacity>
  );
};

export default React.memo(ProvinceTag);
