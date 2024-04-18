import { ReactElement, useState } from "react";
import { View, Pressable } from "react-native";
import FontText from "../FontText";
import RadioButton from "../RadioButton";
import { COLOR } from "@/constants";

type SelectorProps = {
  children: ReactElement<SelectItemProps>[];
  defaultValue?: string;
  onValueChange: (value: string) => void;
};

type SelectItemProps = {
  name: string;
  value: string;
  onPress?: () => void;
  isSelected?: boolean;
};

const Selector = ({
  children,
  defaultValue = "",
  onValueChange,
}: SelectorProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  return (
    <View>
      {children.map((child) => (
        <SelectItem
          key={child.props.value}
          onPress={() => handleSelectChange(child.props.value)}
          isSelected={selectedValue === child.props.value}
          {...child.props}
        />
      ))}
    </View>
  );
};

export const SelectItem = ({ onPress, name, isSelected }: SelectItemProps) => {
  return (
    <Pressable
      android_ripple={{
        color: COLOR.lightgray,
        borderless: false,
        foreground: true,
      }}
      onPress={onPress}
      className="flex-row items-center gap-2 px-5 py-3 overflow-hidden"
    >
      <RadioButton isSelected={!!isSelected} />
      <FontText className="text-lg">{name}</FontText>
    </Pressable>
  );
};

export default Selector;
