import { View, TextInput, TouchableOpacity } from "react-native";
import { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "@/hooks/auth/AuthContext";
import { DisplayMode, useModal } from "@/hooks/ModalContext";

import { CustomModal, FontText, RectangleButton } from "@/components/common";
import { MessageType } from "@/components/common/modal/Dialog";

type Props = {
  modalVisible: boolean;
  onDismiss: () => void;
};

const ChangePassModal: React.FC<Props> = ({ modalVisible, onDismiss }) => {
  const { isOpen, show } = useModal();
  const oldPass = useRef("");
  const newPass = useRef("");
  const newPassRewrite = useRef("");
  const { changePassword } = useAuth();

  const handleChangePassword = async () => {
    if (!oldPass.current || !newPass.current || !newPassRewrite.current) {
      show(DisplayMode.Dialog, {
        dialogType: MessageType.Alert,
        title: "Thay đổi mật khẩu",
        content: "Vui lòng không được để trống!",
      });
      return;
    } else if (newPass.current !== newPassRewrite.current) {
      show(DisplayMode.Dialog, {
        dialogType: MessageType.Alert,
        title: "Mật khẩu không trùng khớp",
        content: "Vui lòng kiểm tra lại!",
      });
      return;
    }

    const response = await changePassword(oldPass.current, newPass.current);
    if (response.success) {
      show(DisplayMode.Dialog, {
        dialogType: MessageType.Success,
        title: "Thành công",
        content: "Đã thay đổi mật khẩu!",
      });
      if (!isOpen) onDismiss();
    } else {
      show(DisplayMode.Dialog, {
        dialogType: MessageType.Error,
        title: "Sai mật khẩu",
        content: "Có vẻ bạn đã nhập sai mật khẩu. Vui lòng kiểm tra lại!",
      });
    }
  };

  return (
    <CustomModal isOpen={modalVisible} withInput>
      <View className="w-11/12 justify-center items-center bg-white rounded-xl">
        <TouchableOpacity
          onPress={onDismiss}
          className="absolute top-3 right-3"
        >
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>

        <FontText className="font-bold text-2xl mt-3 mb-2">
          Thay đổi mật khẩu
        </FontText>

        <View className="w-10/12 gap-2">
          <View>
            <FontText className="text-lg my-2">Mật khẩu cũ</FontText>
            <TextInput
              className="border rounded-lg border-gray-300 py-2 px-4"
              autoFocus
              onChangeText={(value) => (oldPass.current = value)}
            />
          </View>

          <View>
            <FontText className="text-lg my-2">Mật khẩu mới</FontText>
            <TextInput
              className="border rounded-lg border-gray-300 py-2 px-4"
              onChangeText={(value) => (newPass.current = value)}
            />
          </View>

          <View>
            <FontText className="text-lg my-2">Nhập lại mật khẩu</FontText>
            <TextInput
              className="border rounded-lg border-gray-300 py-2 px-4"
              onChangeText={(value) => (newPassRewrite.current = value)}
            />
          </View>
        </View>

        <RectangleButton
          onPress={handleChangePassword}
          className="w-1/2 my-4"
          text="Hoàn tất"
        />
      </View>
    </CustomModal>
  );
};

export default ChangePassModal;
