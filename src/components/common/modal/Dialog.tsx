import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomModal from "./CustomModal";

export enum MessageType {
  Success = "success",
  Alert = "alert",
  Error = "error",
}

export enum DialogOption {
  Single = "single",
  Double = "double",
}

type Props = {
  option: DialogOption;
  dialogType: MessageType;
  isVisible: boolean;
  onClose: () => void;
  onCancel?: () => void;
  title?: string;
  content?: string;
};

const messageMap: Record<
  MessageType,
  {
    icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
    color: string;
  }
> = {
  [MessageType.Success]: { icon: "check-circle", color: "#128F51" },
  [MessageType.Alert]: { icon: "alert-circle", color: "#FFD700" },
  [MessageType.Error]: { icon: "close-circle", color: "#FF6347" },
};

const Dialog: React.FC<Props> = ({
  option = DialogOption.Single,
  dialogType,
  isVisible,
  onClose,
  onCancel,
  title,
  content,
}) => {
  const { icon, color } = messageMap[dialogType];

  const handleConfirm = () => {
    onClose();
  };

  const handleCancel = () => {
    onCancel && onCancel();
  };

  if (!isVisible) return;

  return (
    <CustomModal isOpen={isVisible}>
      <View
        className="w-11/12 min-h-60 items-center justify-around bg-white rounded-3xl"
        style={{ borderColor: color }}
      >
        <View className="w-24 h-24 bg-white rounded-full absolute -top-14" />
        <MaterialCommunityIcons
          name={icon as any}
          size={120}
          color={color}
          style={{ position: "absolute", top: -62 }}
        />
        <Text className="font-bold text-3xl mt-12 mx-1 text-center">
          {title}
        </Text>
        <Text className="font-semibold text-center">{content}</Text>

        {option === DialogOption.Single ? (
          <TouchableOpacity
            onPress={handleConfirm}
            className="drop-shadow-2xl bg-white border rounded-2xl py-2 w-10/12"
            style={{ borderColor: color }}
          >
            <Text className="font-bold text-lg text-center">Đã hiểu</Text>
          </TouchableOpacity>
        ) : (
          <View className="flex-row gap-8">
            <TouchableOpacity
              onPress={handleCancel}
              className="drop-shadow-2xl bg- border rounded-2xl py-2 w-1/3"
            >
              <Text className="font-bold text-lg text-center">Huỷ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleConfirm}
              className="drop-shadow-2xl bg-blue-500 rounded-2xl py-2 w-1/3"
            >
              <Text className="font-bold text-lg text-center text-white">
                Đồng ý
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </CustomModal>
  );
};

export default Dialog;
