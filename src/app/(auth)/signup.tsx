import { useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Button, Input } from "@/components";
import { useAuth } from "@/hooks/auth/AuthContext";
import Dialog, { MessageType } from "@/components/Dialog";

const SignupScreen = () => {
  const [isShow, setIsShow] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);

  const [dialogType, setDialogType] = useState(MessageType.Success);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isShowDialog, setIsShowDialog] = useState(false);

  const { register } = useAuth();

  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPassRef = useRef("");

  const handleRegister = async () => {
    if (
      !usernameRef.current ||
      !emailRef.current ||
      !passwordRef.current ||
      !confirmPassRef.current
    ) {
      setDialogType(MessageType.Alert);
      setTitle("Đăng ký");
      setContent("Vui lòng điền đầy đủ thông tin!");
      setIsShowDialog(true);
      return;
    }

    let response = await register(
      usernameRef.current,
      emailRef.current,
      passwordRef.current
    );

    if (!response.success) {
      setDialogType(MessageType.Error);
      setTitle("Đăng ký thất bại!");
      setContent(response.msg as string);
      setIsShowDialog(true);
    }
  };

  return (
    <View className="flex-1 bg-white p-7">
      <View className="flex-1 items-center justify-center">
        <Image
          resizeMode="cover"
          source={require("../../../assets/paws-logo.png")}
          className="w-[132px] h-1/6 my-4"
        />

        <Text className="text-4xl font-bold text-lighter_primary mb-10">
          Bio
          <Text className="text-4xl font-bold text-yellow-500">Map</Text>
        </Text>

        <Input
          leftIcon={
            <MaterialCommunityIcons
              name="account-outline"
              size={24}
              color="#128F51"
            />
          }
          placeholder="Tên tài khoản"
          onChangeText={(value) => (usernameRef.current = value)}
        />

        <Input
          leftIcon={
            <MaterialCommunityIcons
              name="email-outline"
              size={22}
              color="#128F51"
            />
          }
          placeholder="Email"
          onChangeText={(value) => (emailRef.current = value)}
        />

        <Input
          leftIcon={
            <MaterialCommunityIcons name="lock" size={22} color="#128F51" />
          }
          placeholder="Mật khẩu"
          onChangeText={(value) => (passwordRef.current = value)}
          secureTextEntry={!isShow}
          rightIcon={
            <TouchableOpacity
              className="absolute top-[13px] right-3"
              onPress={() => {
                setIsShow(!isShow);
              }}
            >
              <Octicons
                name={isShow ? "eye" : "eye-closed"}
                size={22}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          }
        />

        <Input
          leftIcon={
            <MaterialCommunityIcons
              name="lock-check"
              size={22}
              color="#128F51"
            />
          }
          placeholder="Xác nhận mật khẩu"
          onChangeText={(value) => (confirmPassRef.current = value)}
          secureTextEntry={!isShowConfirm}
          rightIcon={
            <TouchableOpacity
              className="absolute top-[13px] right-3"
              onPress={() => {
                setIsShowConfirm(!isShowConfirm);
              }}
            >
              <Octicons
                name={isShowConfirm ? "eye" : "eye-closed"}
                size={22}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          }
        />

        <Button onPress={handleRegister} value="Đăng Ký" />

        <View className="flex-row justify-center items-center mt-6">
          <Text>Đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => router.replace("(auth)/login")}>
            <Text className="text-lighter_primary">Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Dialog
        dialogType={dialogType}
        isVisible={isShowDialog}
        onClose={() => setIsShowDialog(false)}
        title={title}
        content={content}
      />
    </View>
  );
};

export default SignupScreen;
