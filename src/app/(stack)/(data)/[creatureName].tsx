import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { DocumentData } from "firebase/firestore";

import {
  CreatureInfor,
  Dialog,
  ImagePickerModal,
  Loader,
} from "@/components/common";

import {
  getCreatureInfor,
  getProvincesContainCreature,
} from "@/api/CreatureApi";
import { DisplayMode, ModalProvider, useModal } from "@/hooks/ModalContext";
import { useImagePicker } from "@/hooks/useImagePicker";
import { CheckList } from "@/components/contribute";

const CreatureInformation = () => {
  const { creatureName, type } = useLocalSearchParams<{
    creatureName: string;
    type: string;
  }>();

  const { modalVisible, setModalVisible, imageUrl, uploadImage, removeImage } =
    useImagePicker();
  const { displayMode, isOpen, modalContent, hide, dataList } = useModal();

  const [creatureInfor, setCreatureInfor] = useState<DocumentData>({});
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const [restart, setRestart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!type || !creatureName) {
          throw new Error("Missing creature name or type from search params");
        }

        const creatureData = await getCreatureInfor(creatureName, type);
        const provinces = await getProvincesContainCreature(creatureName, type);

        if (creatureData && provinces) {
          const mergedData = { ...creatureData, provinces, type };
          setCreatureInfor(mergedData);
          setTempImageUrl(creatureData.image_url);
        }
        setRestart(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [restart]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {Object.keys(creatureInfor).length > 0 ? (
        <CreatureInfor
          creatureData={creatureInfor}
          tempImageUrl={tempImageUrl}
          imageUrl={imageUrl}
          openModal={() => setModalVisible(true)}
          setRestart={() => setRestart(true)}
        />
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
            option={modalContent.dialogOption}
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
              dataList.length !== 0 ? dataList : creatureInfor.provinces
            }
          />
        ))}
    </SafeAreaView>
  );
};

const CreatureInformationScreen = () => {
  return (
    <ModalProvider>
      <CreatureInformation />
    </ModalProvider>
  );
};

export default CreatureInformationScreen;
