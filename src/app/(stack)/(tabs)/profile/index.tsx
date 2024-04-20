import { View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { IMAGES } from "@/constants";
import { WaveSvg } from "@/components/svg";
import { FontText } from "@/components/common";
import { useAuth } from "@/hooks/auth/AuthContext";
import { ButtonSession } from "@/components/profile";

const ProfileScreen = () => {
  const { logout } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#128F51" }}>
      <View className="bg-white">
        <View className="h-1/4 items-center z-10">
          <WaveSvg />

          <View className="absolute mt-2">
            <FontText className="text-center font-bold text-2xl text-white">
              Hồ sơ
            </FontText>
          </View>

          <View className="w-40 h-40 rounded-full border-4 border-lighter_primary absolute top-24">
            <Image className="w-full h-full" source={IMAGES.avatar} />
          </View>
        </View>

        <View className="h-3/4 items-center">
          <FontText className="font-bold text-2xl mt-14">
            Sasayaki Meijin
          </FontText>

          <ScrollView className="w-full px-8">
            <ButtonSession
              title="Tài khoản"
              items={[
                {
                  icon: "setting",
                  text: "Thiết lập hồ sơ",
                },
              ]}
            />

            <ButtonSession
              title="Dịch vụ"
              items={[
                {
                  icon: "questioncircleo",
                  text: "Hỏi đáp và hỗ trợ",
                },
                {
                  icon: "book",
                  text: "Điều khoản và chính sách",
                },
                {
                  icon: "qrcode",
                  text: "Ủng hộ chúng tôi",
                },
              ]}
            />

            <ButtonSession
              title="Hoạt động"
              items={[
                {
                  icon: "logout",
                  text: "Đăng xuất",
                  onPress: logout,
                },
                {
                  icon: "delete",
                  text: "Xóa tài khoản",
                },
              ]}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
