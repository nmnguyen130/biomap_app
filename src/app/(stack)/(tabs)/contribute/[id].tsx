import { View } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { DocumentData } from "@firebase/firestore";

import { getFormDataById } from "@/api/FormApi";
import { useImagePicker } from "@/hooks/useImagePicker";
import { DisplayMode, ModalProvider, useModal } from "@/hooks/ModalContext";

import { Dialog, ImagePickerModal, Loader } from "@/components/common";
import { CheckList, FormInfor } from "@/components/contribute";

const FormData = () => {
  const { formId } = useLocalSearchParams<{ formId: string }>();

  const [restart, setRestart] = useState(false);
  const [formInfor, setFormInfor] = useState<DocumentData>({});
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);

  const { modalVisible, setModalVisible, imageUrl, uploadImage, removeImage } =
    useImagePicker();
  const { displayMode, isOpen, modalContent, hide, dataList } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!formId) {
          throw new Error("Missing formId from search params");
        }
        const formInfor = await getFormDataById(formId);

        if (formInfor) {
          setFormInfor(formInfor);
          ///@ts-ignore
          setTempImageUrl(formInfor.imageUrl);
        }
        setRestart(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [restart]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {Object.keys(formInfor).length > 0 ? (
        <View className="flex-1 p-3">
          <FormInfor
            formData={formInfor}
            tempImageUrl={tempImageUrl}
            setRestart={() => setRestart(true)}
            openModal={() => setModalVisible(true)}
            imageUrl={imageUrl}
          />
        </View>
      ) : (
        <Loader width={450} height={450} />
      )}

      <ImagePickerModal
        modalVisible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onCameraPress={() => uploadImage("camera")}
        onLibraryPress={() => uploadImage("gallery")}
        onRemovePress={() => {
          removeImage();
          setTempImageUrl(null);
        }}
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
            provincesList={
              dataList.length !== 0 ? dataList : formInfor.provinces
            }
          />
        ))}
    </SafeAreaView>
  );
};

const FormDataScreen = () => {
  return (
    <ModalProvider>
      <FormData />
    </ModalProvider>
  );
};

export default FormDataScreen;
