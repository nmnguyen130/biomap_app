import { Text, TouchableOpacity } from "react-native";

interface Props {
  onPress: () => void;
  isSelected?: boolean;
  width?: "half" | "full";
  value: string;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  width = "full",
  onPress,
  isSelected = true,
  value,
  disabled = false,
}) => {
  const buttonWidth = width === "full" ? "w-full p-4 mt-4" : "w-1/2 p-4";
  const opacity = disabled ? "opacity-85" : "";

  return (
    <TouchableOpacity
      className={`
    ${isSelected ? "bg-lighter_primary" : "bg-white"}
    ${buttonWidth} ${opacity} rounded-3xl items-center justify-center
  `}
      onPress={() => onPress()}
      disabled={disabled}
    >
      <Text
        className={`
        ${isSelected ? "text-white" : "text-lighter_primary"}
        text-base font-medium
      `}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
