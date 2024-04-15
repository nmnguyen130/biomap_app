import { View, TextInputProps, TextInput } from "react-native";
import React, { ReactNode } from "react";

type Props = {
  leftIcon: ReactNode;
  label: string;
} & TextInputProps;

const AuthInput = (props: Props) => {
  const { leftIcon, label, ...otherProps } = props;

  return (
    <View className="flex-row items-center gap-3 bg-gray-100 p-3 mb-3 rounded-lg">
      {leftIcon}
      <TextInput
        placeholder={label}
        className="flex-1"
        secureTextEntry={false}
        {...otherProps}
      />
    </View>
  );
};

export default AuthInput;
