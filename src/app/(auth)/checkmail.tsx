import { useRef } from "react";
import { View, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { DisplayMode, ModalProvider, useModal } from "@/hooks/ModalContext";
import { useAuth } from "@/hooks/auth/AuthContext";

import { IMAGES } from "@/constants";
import { FontText, RectangleButton } from "@/components/common";
import Dialog, { MessageType } from "@/components/common/modal/Dialog";

const CheckEmailSubScreen = () => {
  const emailRef = useRef<string>("");

  const { displayMode, isOpen, modalContent, show, hide } = useModal();
  const { sendOtp } = useAuth();

  const handleSendOtp = async () => {
    if (!emailRef.current) {
      show(DisplayMode.Dialog, {
        dialogType: MessageType.Alert,
        title: "Quên mật khẩu",
        content: "Vui lòng nhập địa chỉ email của bạn!",
      });
      return;
    }

    const response = await sendOtp(emailRef.current);

    if (!response.success) {
      show(DisplayMode.Dialog, {
        dialogType: MessageType.Error,
        title: "Thất bại!",
        content: response.msg,
      });
    } else {
      router.push("(auth)/forgot");
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View className="flex-1 items-center">
        <Image source={IMAGES.checkmailbg} className="w-full h-1/2" />

        <FontText className="absolute top-8 left-6 z-10 text-3xl text-bold">
          Quên mật khẩu
        </FontText>

        <View className="w-10/12">
          <FontText className="text-lg my-6">
            Nhập địa chỉ Email của bạn
          </FontText>

          <TextInput
            className="border rounded-lg py-3 px-4"
            placeholder="example123@gmail.com"
            onChangeText={(value) => (emailRef.current = value)}
          />

          <RectangleButton
            onPress={handleSendOtp}
            className="mt-10 -mx-2 py-4"
            text="Gửi mã OTP"
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
    </SafeAreaView>
  );
};

const CheckEmailScreen = () => {
  return (
    <ModalProvider>
      <CheckEmailSubScreen />
    </ModalProvider>
  );
};

export default CheckEmailScreen;
