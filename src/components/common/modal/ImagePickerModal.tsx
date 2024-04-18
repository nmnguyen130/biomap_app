import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
    <>
      {modalVisible && (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          ]}
        />
      )}
      <Modal visible={modalVisible} transparent>
        <View className="flex-1 justify-center items-center bg-lighter_primary mx-6 my-[300px] rounded-lg">
          <Text className="text-2xl top-4 absolute text-gray-800">
            Choose an option
          </Text>
          <TouchableOpacity
            onPress={onDismiss}
            className="absolute top-4 right-4"
          >
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <View className="flex-row items-center w-full justify-evenly pt-6">
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
      </Modal>
    </>
  );
};

export default ImagePickerModal;
