import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomModal from "./CustomModal";
import FontText from "../FontText";

type Props = {
  modalVisible: boolean;
  onDismiss: () => void;
  onCameraPress: () => void;
  onLibraryPress: () => void;
  onRemovePress: () => void;
};

const ImagePickerModal: React.FC<Props> = ({
  modalVisible,
  onDismiss,
  onCameraPress,
  onLibraryPress,
  onRemovePress,
}) => {
  return (
    <CustomModal isOpen={modalVisible}>
      <View className="w-full items-center bg-lighter_primary rounded-lg">
        <FontText className="text-2xl text-gray-800 mt-2">
          Choose an option
        </FontText>

        <TouchableOpacity
          onPress={onDismiss}
          className="absolute top-3 right-4"
        >
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>

        <View className="flex-row items-center w-full justify-evenly pt-6 mb-4">
          <TouchableOpacity
            className="items-center rounded-md w-24 border p-3 bg-yellow-300"
            onPress={onCameraPress}
          >
            <Ionicons name="camera-outline" size={24} color="black" />
            <Text>Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center rounded-md w-24 border p-3 bg-yellow-300"
            onPress={onLibraryPress}
          >
            <Ionicons name="image-outline" size={24} color="black" />
            <Text>Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center rounded-md w-24 border p-3 bg-yellow-300"
            onPress={onRemovePress}
          >
            <Ionicons name="trash-outline" size={24} color="black" />
            <Text>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomModal>
  );
};

export default ImagePickerModal;
