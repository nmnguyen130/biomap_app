import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomModal from "./CustomModal";

export enum MessageType {
  Success = "success",
  Alert = "alert",
  Error = "error",
}

type Props = {
  dialogType: MessageType;
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  content?: string;
};

const messageMap: { [key in MessageType]: MessageDetails } = {
  [MessageType.Success]: {
    icon: "check-circle",
    color: "#128F51",
  },
  [MessageType.Alert]: {
    icon: "alert-circle",
    color: "#FFD700",
  },
  [MessageType.Error]: {
    icon: "close-circle",
    color: "#FF6347",
  },
};

type MessageDetails = {
  icon: string;
  color: string;
};

const Dialog: React.FC<Props> = ({
  dialogType,
  isVisible,
  onClose,
  title,
  content,
}) => {
  const selectedMessage = messageMap[dialogType];

  const handleClose = () => {
    onClose();
  };

  if (!isVisible) return;

  return (
    <CustomModal isOpen={isVisible}>
      <View
        className="w-11/12 min-h-60 items-center justify-around bg-white rounded-3xl"
        style={{ borderColor: selectedMessage.color }}
      >
        <View className="w-24 h-24 bg-white rounded-full absolute -top-14" />
        <MaterialCommunityIcons
          name={selectedMessage.icon as any}
          size={120}
          color={selectedMessage.color}
          style={{ position: "absolute", top: -62 }}
        />
        <Text className="font-bold text-3xl mt-12 mx-1 text-center">
          {title}
        </Text>
        <Text className="font-semibold text-center">{content}</Text>

        <TouchableOpacity
          onPress={handleClose}
          className="drop-shadow-2xl bg-white border rounded-2xl py-2 w-10/12"
          style={{ borderColor: selectedMessage.color }}
        >
          <Text className="font-bold text-lg text-center">Đã hiểu</Text>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
};

export default Dialog;
