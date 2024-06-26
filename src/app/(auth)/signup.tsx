import { useRef, useState } from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useAuth } from "@/hooks/auth/AuthContext";
import { DisplayMode, ModalProvider, useModal } from "@/hooks/ModalContext";

import Dialog, {
  DialogOption,
  MessageType,
} from "@/components/common/modal/Dialog";
import { AuthInput, AuthPassword } from "@/components/auth";
import {
  BiomapLogo,
  FontText,
  PressableText,
  RectangleButton,
} from "@/components/common";

const SignupForm = () => {
  const { displayMode, isOpen, modalContent, show, hide } = useModal();

  const { register } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

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
        dialogOption: DialogOption.Single,
        dialogType: MessageType.Alert,
        title: "Đăng ký",
        content: "Vui lòng điền đầy đủ thông tin!",
      });
      return;
    }

    setIsLoading(true);
    let response = await register(
      usernameRef.current,
      emailRef.current,
      passwordRef.current
    );
    setIsLoading(false);

    if (!response.success) {
      show(DisplayMode.Dialog, {
        dialogOption: DialogOption.Single,
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
              onPress={handleRegister}
              className="mx-6"
              text={isLoading ? "Vui lòng đợi..." : "Đăng ký"}
              disabled={isLoading}
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
          option={modalContent.dialogOption}
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
