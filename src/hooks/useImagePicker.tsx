import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export const useImagePicker = () => {
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [modalVisible, setModalVisible] = useState(false);

  const uploadImage = async (mode: string) => {
    try {
      let result: ImagePicker.ImagePickerResult;

      if (mode === "camera") {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      } else {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }

      if (!result.canceled) {
        // Save Image
        await saveImage(result);
      }
    } catch (error) {
      alert("Error accessing your Camera! " + (error as Error).message);
      setModalVisible(false);
    }
  };

  const saveImage = async (
    image: ImagePicker.ImagePickerSuccessResult | null
  ) => {
    try {
      if (image) {
        // Upload displayed image
        setImageUrl(image.assets[0].uri);
        setModalVisible(false);
      } else {
        setImageUrl(null);
      }
    } catch (error) {
      throw error;
    }
  };

  const removeImage = async () => {
    try {
      saveImage(null);
    } catch (error) {
      alert((error as Error).message);
    }
    setModalVisible(false);
  };

  return { modalVisible, setModalVisible, imageUrl, uploadImage, removeImage };
};
