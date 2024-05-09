import { View, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { IMAGES } from "@/constants";
import { FontText, RectangleButton } from "@/components/common";

const CheckEmailScreen = () => {
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
          />

          <RectangleButton className="mt-10 -mx-2 py-4" text="Gửi mã OTP" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckEmailScreen;
