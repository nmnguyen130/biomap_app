import { useEffect, useRef, useState } from "react";
import { View, Switch } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useAuth } from "@/hooks/auth/AuthContext";
import { DisplayMode, ModalProvider, useModal } from "@/hooks/ModalContext";
import {
  saveLoginInfoToCache,
  getLoginInfoFromCache,
  clearLoginInfoFromCache,
} from "@/utils/storage";

import Dialog, { MessageType } from "@/components/common/modal/Dialog";
import { AuthInput, AuthPassword } from "@/components/auth";
import {
  BiomapLogo,
  FontText,
  PressableText,
  RectangleButton,
} from "@/components/common";
import { COLOR } from "@/constants";

const LoginForm = () => {
  const { displayMode, isOpen, modalContent, show, hide } = useModal();
  const { login } = useAuth();

  const [rememberMe, setRememberMe] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  useEffect(() => {
    const loadLoginInfo = async () => {
      const loginInfo = await getLoginInfoFromCache();
      if (loginInfo) {
        emailRef.current = loginInfo.email;
        passwordRef.current = loginInfo.password;
        setRememberMe(true);
      }
    };
    loadLoginInfo();
  }, []);

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      show(DisplayMode.Dialog, {
        dialogType: MessageType.Alert,
        title: "Đăng nhập",
        content: "Vui lòng điền đầy đủ thông tin!",
      });
      return;
    }

    const response = await login(emailRef.current, passwordRef.current);

    if (!response.success) {
      show(DisplayMode.Dialog, {
        dialogType: MessageType.Error,
        title: "Đăng nhập thất bại!",
        content: response.msg,
      });
    } else {
      if (rememberMe) {
        await saveLoginInfoToCache(emailRef.current, passwordRef.current);
      } else {
        clearLoginInfoFromCache();
      }
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="flex-1 items-center justify-center">
        <BiomapLogo className="my-8" />

        <View className="w-full">
          <AuthInput
            leftIcon={
              <MaterialCommunityIcons name="email" size={22} color="#128F51" />
            }
            label="Email"
            onChangeText={(value) => (emailRef.current = value)}
            defaultValue={emailRef.current}
          />

          <AuthPassword
            leftIcon={
              <MaterialCommunityIcons name="lock" size={22} color="#128F51" />
            }
            label="Mật khẩu"
            onChangeText={(value) => (passwordRef.current = value)}
            defaultValue={passwordRef.current}
          />

          <View className="flex-row items-center -mt-3 mb-2">
            <Switch
              value={rememberMe}
              onValueChange={() => setRememberMe((prev) => !prev)}
              trackColor={{ true: COLOR.lighter_primary }}
              thumbColor="white"
            />
            <FontText className="flex-1">Remember Me</FontText>
            <PressableText className="text-right">Quên mật khẩu?</PressableText>
          </View>

          <RectangleButton
            className="mx-6"
            text="Đăng nhập"
            onPress={handleLogin}
          />

          <View className="self-center justify-center items-center w-11/12 bg-gray-200 h-px rounded-full my-8">
            <View className="bg-white w-20 h-6">
              <FontText className="text-center opacity-60">Hoặc</FontText>
            </View>
          </View>

          <RectangleButton
            text="Tạo tài khoản mới"
            className="border-2 border-gray-200 mx-6"
            secondary
            onPress={() => router.replace("(auth)/signup")}
          />
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

const LoginScreen = () => {
  return (
    <ModalProvider>
      <LoginForm />
    </ModalProvider>
  );
};

export default LoginScreen;
