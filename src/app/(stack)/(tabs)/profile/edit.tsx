import { View, TouchableOpacity, Image, TextInput } from "react-native";
import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { DisplayMode, ModalProvider, useModal } from "@/hooks/ModalContext";
import { useAuth } from "@/hooks/auth/AuthContext";

import { IMAGES } from "@/constants";
import Dialog, { MessageType } from "@/components/common/modal/Dialog";
import { FontText, RectangleButton } from "@/components/common";
import { ChangePassModal } from "@/components/profile";
import { auth } from "@/utils/firebase";

const EditProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, changeUsername } = useAuth();
  const { displayMode, isOpen, modalContent, show, hide } = useModal();

  const usernameRef = useRef(user?.username);

  const handleUpdate = async () => {
    if (user && usernameRef.current) {
      setIsLoading(true);

      const response = await changeUsername(user?.userId, usernameRef.current);

      setIsLoading(false);
      if (response.success) {
        show(DisplayMode.Dialog, {
          dialogType: MessageType.Success,
          title: "Thành công",
          content: "Đã thay đổi tên đăng nhập!",
        });
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View className="items-center p-4">
        <View className="w-full items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-0 left-0"
          >
            <Ionicons name="chevron-back" size={28} color="black" />
          </TouchableOpacity>

          <FontText className="font-bold text-2xl self-center">
            Thiết lập hồ sơ
          </FontText>

          <TouchableOpacity className="w-44 h-44 m-6 rounded-full">
            <Image className="w-full h-full" source={IMAGES.avatar} />
            <Ionicons
              name="camera"
              size={30}
              color="#0E6C38"
              className="absolute bottom-2 right-2"
            />
          </TouchableOpacity>

          <RectangleButton
            onPress={() => setModalVisible(true)}
            className="w-3/4"
            text="Nhấn để thay đổi mật khẩu"
          />
        </View>

        <View className="mx-3 mt-6">
          <View>
            <FontText className="font-bold text-lg my-2">Tên</FontText>
            <TextInput
              className="border rounded-lg border-gray-300 py-2 px-4"
              defaultValue={usernameRef.current}
              onChangeText={(value) => (usernameRef.current = value)}
            />
            <FontText className="text-gray-500 ms-1 mt-2">
              Mỗi tháng có thể chỉnh sửa 1 lần, lượt chỉnh sửa sẽ được làm mới
              vào ngày 1 hàng tháng (UTC+7), tên không được chứa ký tự đặc biệt
            </FontText>
          </View>

          <View>
            <FontText className="font-bold text-lg my-2">Email</FontText>
            <TextInput
              className="border rounded-lg border-gray-300 py-2 px-4"
              defaultValue={auth.currentUser?.email || "No email available!"}
              editable={false}
            />
            <FontText className="text-gray-500 ms-1 mt-2">
              Email không thể thay thế hay chỉnh sửa
            </FontText>
          </View>
        </View>

        <RectangleButton
          onPress={handleUpdate}
          className="w-10/12 bg-lighter_primary mt-6"
          text={isLoading ? "Đang lưu" : "Lưu thay đổi"}
          disabled={isLoading}
        />
      </View>

      <ChangePassModal
        modalVisible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />

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

const EditProfileScreen = () => {
  return (
    <ModalProvider>
      <EditProfile />
    </ModalProvider>
  );
};

export default EditProfileScreen;
