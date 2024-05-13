import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLOR } from "@/constants";

interface Count {
  total: number;
  approved: number;
  pending: number;
}

interface CountItemProps {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
  colorText: string;
  label: string;
  count: number;
}

const CountItem: React.FC<CountItemProps> = ({
  icon,
  color,
  colorText,
  label,
  count,
}) => {
  const textColor = `text-${colorText}`;
  const borderColor = `border-${colorText}`;

  return (
    <View
      className={`flex-row w-max justify-around items-center border ${borderColor} rounded-lg px-1 py-2.5`}
    >
      <MaterialCommunityIcons
        className="px-1"
        name={icon}
        size={24}
        color={color}
      />
      <Text className={`${textColor} pe-1.5`}>
        {label}: {count}
      </Text>
    </View>
  );
};

const CountBox = ({ total, approved, pending }: Count) => {
  return (
    <View className="flex-row justify-around mx-2.5 my-0.5 gap-3">
      <CountItem
        icon="upload"
        color={COLOR.blue}
        colorText="blue-500"
        label="Tổng"
        count={total}
      />
      <CountItem
        icon="checkbox-marked-circle-outline"
        color={COLOR.lighter_primary}
        colorText="lighter_primary"
        label="Approved"
        count={approved}
      />
      <CountItem
        icon="progress-clock"
        color={COLOR.orange}
        colorText="yellow-500"
        label="Pending"
        count={pending}
      />
    </View>
  );
};

export default CountBox;
