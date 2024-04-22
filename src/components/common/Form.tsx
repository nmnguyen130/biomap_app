import { useRef, useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image } from "expo-image";

import { Role, useAuth } from "@/hooks/auth/AuthContext";
import { DisplayMode, useModal } from "@/hooks/ModalContext";
import { useCreatureType } from "@/hooks/CreatureTypeContext";

import { addFormData } from "@/api/FormApi";
import { addCreature } from "@/api/CreatureApi";
import { MessageType } from "../common/modal/Dialog";
import RectangleButton from "./RectangleButton";
import ToggleButton from "./ToggleButton";

type Props = {
  openModal: () => void;
  imageUrl: string | null;
};

const Form: React.FC<Props> = ({ openModal, imageUrl }) => {
  const { selectedType } = useCreatureType();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { show, dataList } = useModal();

  const scientificName = useRef("");
  const name = useRef("");
  const characteristic = useRef("");
  const behavior = useRef("");
  const habitat = useRef("");

  const provincesText = dataList.join(", ");

  const options = { timeZone: "Asia/Ho_Chi_Minh", hour12: false };

  const handlerSend = async () => {
    if (!name.current && !imageUrl) {
      show(DisplayMode.Dialog, {
        dialogType: MessageType.Alert,
        title: "Đóng góp",
        content: "Tên/Hình ảnh không được để trống!",
      });
      return;
    }

    setIsLoading(true);
    const today = new Date().toLocaleString("en-US", options);

    const data = {
      userId: user?.userId,
      scientificName: scientificName.current,
      name: name.current,
      characteristic: characteristic.current,
      behavior: behavior.current,
      habitat: habitat.current,
      provinces: dataList,
      imageUrl: imageUrl as unknown as string,
      type: selectedType,
      submissionDate: today,
      status: "pending",
    };

    const response = await addFormData(data);

    setIsLoading(false);
    if (response.success) {
      router.replace("(tabs)/contribute");
    }
  };

  const handlerAdd = async () => {
    if (
      !name.current ||
      !imageUrl ||
      !scientificName.current ||
      !characteristic.current ||
      !habitat.current ||
      provincesText === "" ||
      (selectedType === "animal" && !behavior.current)
    ) {
      show(DisplayMode.Dialog, {
        dialogType: MessageType.Alert,
        title: "Thiếu thông tin",
        content: "Vui lòng điền đầy đủ thông tin sinh vật!",
      });
      return;
    }

    setIsLoading(true);
    const data = {
      id: scientificName.current,
      name: name.current,
      characteristic: characteristic.current,
      ...(selectedType === "animal" && { behavior: behavior.current }),
      habitat: habitat.current,
      image_url: imageUrl as unknown as string,
      type: selectedType,
    };
    console.log(data);

    const response = await addCreature(data, dataList);

    setIsLoading(false);
    if (response.success) {
      router.replace("(tabs)/admin");
    }
  };

  return (
    <View className="flex-1">
      <ToggleButton />

      <View>
        <View className="m-3 pb-3 border-b border-gray-400">
          <TextInput
            className="text-gray-800"
            placeholder="Tên khoa học"
            onChangeText={(value) => (scientificName.current = value)}
          ></TextInput>
        </View>

        <View className="m-3 pb-3 border-b border-gray-400">
          <TextInput
            className="text-gray-800"
            placeholder="Tên sinh vật"
            onChangeText={(value) => (name.current = value)}
          ></TextInput>
        </View>

        <View className="m-3 pb-3 border-b border-gray-400">
          <TextInput
            multiline
            className="w-11/12 text-gray-800"
            placeholder="Đặc điểm"
            onChangeText={(value) => (characteristic.current = value)}
          ></TextInput>
        </View>

        {selectedType === "animal" && (
          <View className="m-3 pb-3 border-b border-gray-400">
            <TextInput
              multiline
              className="w-11/12 text-gray-800"
              placeholder="Tập tính"
              onChangeText={(value) => (behavior.current = value)}
            ></TextInput>
          </View>
        )}

        <View className="m-3 pb-3 border-b border-gray-400">
          <TextInput
            multiline
            className="w-11/12 text-gray-800"
            placeholder="Môi trường sống"
            onChangeText={(value) => (habitat.current = value)}
          ></TextInput>
        </View>

        <TouchableOpacity
          className="m-3 flex-row justify-between items-center pb-3 border-b border-gray-400"
          onPress={() => show(DisplayMode.Checklist)}
        >
          <TextInput
            multiline
            value={provincesText}
            editable={false}
            className="w-11/12 text-gray-800"
            placeholder="Tỉnh"
          ></TextInput>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={openModal}
          className="self-center justify-center items-center border-primary border-2 rounded-lg w-2/3 aspect-4/3 my-3"
        >
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={{
                width: "100%",
                aspectRatio: 4 / 3,
                borderRadius: 6,
              }}
            />
          ) : (
            <Ionicons name="image-outline" size={44} color="green" />
          )}
        </TouchableOpacity>

        <View className="mx-2">
          {user?.role === Role.ADMIN ? (
            <RectangleButton
              onPress={handlerAdd}
              text={isLoading ? "Đang xử lí..." : "Thêm"}
              disabled={isLoading}
            />
          ) : (
            <RectangleButton
              onPress={handlerSend}
              text={isLoading ? "Đang gửi..." : "Gửi"}
              disabled={isLoading}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Form;
