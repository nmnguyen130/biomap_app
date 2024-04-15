import { useRef } from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useAuth } from "@/hooks/auth/AuthContext";
import { DisplayMode, ModalProvider, useModal } from "@/hooks/ModalContext";

import Dialog, { MessageType } from "@/components/Dialog";
import { AuthInput, AuthPassword } from "@/components/auth";
import BiomapLogo from "@/components/common/BiomapLogo";
import { FontText, PressableText, RectangleButton } from "@/components/common";

const SignupForm = () => {
  const { displayMode, isOpen, modalContent, show, hide } = useModal();

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
      show(DisplayMode.Dialog, {
        dialogType: MessageType.Alert,
        title: "Đăng ký",
        content: "Vui lòng điền đầy đủ thông tin!",
      });
      return;
    }

    let response = await register(
      usernameRef.current,
      emailRef.current,
      passwordRef.current
    );

    if (!response.success) {
      show(DisplayMode.Dialog, {
        dialogType: MessageType.Error,
        title: "Đăng ký thất bại!",
        content: response.msg,
      });
    }
  };

  return (
    <View className="flex-1 bg-white p-7">
      <View className="flex-1 items-center justify-center">
        <BiomapLogo className="my-8" />

        <View className="w-full">
          <AuthInput
            leftIcon={
              <MaterialCommunityIcons
                name="account-outline"
                size={24}
                color="#128F51"
              />
            }
            label="Tên tài khoản"
            onChangeText={(value) => (usernameRef.current = value)}
          />

          <AuthInput
            leftIcon={
              <MaterialCommunityIcons
                name="email-outline"
                size={22}
                color="#128F51"
              />
            }
            label="Email"
            onChangeText={(value) => (emailRef.current = value)}
          />

          <AuthPassword
            leftIcon={
              <MaterialCommunityIcons name="lock" size={22} color="#128F51" />
            }
            label="Mật khẩu"
            onChangeText={(value) => (passwordRef.current = value)}
          />

          <AuthPassword
            leftIcon={
              <MaterialCommunityIcons
                name="lock-check"
                size={22}
                color="#128F51"
              />
            }
            label="Xác nhận mật khẩu"
            onChangeText={(value) => (confirmPassRef.current = value)}
          />

          <View className="mt-3">
            <RectangleButton
              className="mx-6"
              text="Đăng ký"
              onPress={handleRegister}
            />
          </View>

          <View className="flex-row justify-center items-center mt-6">
            <FontText>Đã có tài khoản? </FontText>
            <PressableText
              className="text-lighter_primary"
              onPress={() => router.replace("(auth)/login")}
            >
              Đăng nhập
            </PressableText>
          </View>
        </View>
      </View>

      {isOpen && displayMode === DisplayMode.Dialog && (
        <Dialog
          dialogType={modalContent.dialogType}
          isVisible={isOpen}
          onClose={hide}
          title={modalContent.title}
          content={modalContent.content}
        />
      )}
    </View>
  );
};

const SignupScreen = () => {
  return (
    <ModalProvider>
      <SignupForm />
    </ModalProvider>
  );
};

export default SignupScreen;
