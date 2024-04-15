import { ReactNode } from "react";
import { View, TextInput } from "react-native";

interface Props {
  leftIcon: ReactNode;
  placeholder: string;
  onChangeText: (value: string) => string | void;
  secureTextEntry?: boolean;
  rightIcon?: ReactNode;
}

const Input: React.FC<Props> = ({
  leftIcon,
  placeholder,
  onChangeText,
  secureTextEntry,
  rightIcon,
}) => {
  return (
    <View className="w-full bg-gray-100 p-3 mb-4 rounded-lg flex-row items-center">
      {leftIcon}
      <TextInput
        placeholder={placeholder}
        className="ms-2 w-full"
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />

      {rightIcon}
    </View>
  );
};

export default Input;
