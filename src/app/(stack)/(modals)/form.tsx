import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { CreatureTypeProvider } from "@/hooks/CreatureTypeContext";
import { DisplayMode, ModalProvider, useModal } from "@/hooks/ModalContext";
import { Role, useAuth } from "@/hooks/auth/AuthContext";
import { useImagePicker } from "@/hooks/useImagePicker";

import { Dialog, FontText, Form, ImagePickerModal } from "@/components/common";
import { CheckList } from "@/components/contribute";

const NewContributeForm = () => {
  const { user } = useAuth();

  const { modalVisible, setModalVisible, imageUrl, uploadImage, removeImage } =
    useImagePicker();
  const { displayMode, isOpen, modalContent, hide, dataList } = useModal();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 4 }}
    >
      <View className="flex-row w-full items-center justify-center mt-3 mb-6">
        <TouchableOpacity
          className="absolute top-0.5 left-2"
          onPress={() =>
            user?.role === Role.ADMIN
              ? router.replace("admin")
              : router.replace("contribute")
          }
        >
          <FontText className="text-lighter_primary text-xl">Quay lại</FontText>
        </TouchableOpacity>
        <FontText className="text-bold text-3xl">
          {user?.role === Role.ADMIN ? "Thêm sinh vật" : "Đóng góp"}
        </FontText>
      </View>

      <ScrollView>
        <CreatureTypeProvider>
          <Form openModal={() => setModalVisible(true)} imageUrl={imageUrl} />
        </CreatureTypeProvider>
      </ScrollView>

      <ImagePickerModal
        modalVisible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onCameraPress={() => uploadImage("camera")}
        onLibraryPress={() => uploadImage("gallery")}
        onRemovePress={() => removeImage()}
      />

      {isOpen &&
        (displayMode === DisplayMode.Dialog ? (
          <Dialog
            dialogType={modalContent.dialogType}
            isVisible={isOpen}
            onClose={hide}
            title={modalContent.title}
            content={modalContent.content}
          />
        ) : (
          <CheckList
            isVisible={isOpen}
            onClose={hide}
            provincesList={dataList}
          />
        ))}
    </SafeAreaView>
  );
};

const ContributeForm = () => {
  return (
    <ModalProvider>
      <NewContributeForm />
    </ModalProvider>
  );
};

export default ContributeForm;
