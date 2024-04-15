import {
  View,
  TextInputProps,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { ReactNode, useState } from "react";
import { Octicons } from "@expo/vector-icons";

type Props = {
  leftIcon: ReactNode;
  label: string;
} & TextInputProps;

const AuthPassword = (props: Props) => {
  const { leftIcon, label, ...otherProps } = props;

  const [visible, setVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setVisible((prev) => !prev);
  };
  const inputSecured = !visible;

  return (
    <View className="flex-row items-center gap-3 bg-gray-100 p-3 rounded-lg mb-3">
      {leftIcon}
      <TextInput
        placeholder={label}
        className="flex-1"
        secureTextEntry={inputSecured}
        {...otherProps}
      />
      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Octicons
          name={visible ? "eye" : "eye-closed"}
          size={22}
          color="#BDBDBD"
        />
      </TouchableOpacity>
    </View>
  );
};

export default AuthPassword;
