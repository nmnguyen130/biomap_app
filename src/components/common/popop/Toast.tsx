import { useEffect, useRef, useState } from "react";
import { DeviceEventEmitter, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

import FontText from "../FontText";
import { CheckSVG, ErrorSVG, InforSVG } from "@/components/svg";
import { SHOW_TOAST_EVENT_NAME, ToastDataType } from "@/utils/toast";

const icons: Record<string, JSX.Element> = {
  infor: <InforSVG />,
  success: <CheckSVG />,
  danger: <ErrorSVG />,
};

const Toast = () => {
  const [toastData, setToastData] = useState<ToastDataType | null>(null);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);

  const closeToast = () => {
    setToastData(null);
    clearInterval(timeOutRef.current!);
  };

  // Timer countdown
  useEffect(() => {
    if (toastData) {
      timeOutRef.current = setInterval(() => {
        if (toastData.duration && toastData.duration === 0) {
          closeToast();
        } else if (toastData.duration) {
          setToastData((prevData) => ({
            ...prevData!,
            duration: prevData!.duration! - 1000,
          }));
        }
      }, 1000);
    }

    return () => {
      clearInterval(timeOutRef.current!);
    };
  }, [toastData]);

  // Catch the SHOW_TOAST_EVENT_NAME event
  useEffect(() => {
    const listener = (data: ToastDataType) => setToastData(data);
    DeviceEventEmitter.addListener(SHOW_TOAST_EVENT_NAME, listener);

    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  if (!toastData) {
    return null;
  }

  const { message, subMessage, type } = toastData;

  return (
    <Animated.View
      exiting={FadeOutUp.delay(200).duration(1000).springify()}
      entering={FadeInUp.delay(200).duration(1000).springify()}
      className="rounded-full absolute top-10 mx-auto bg-white self-center shadow-xl shadow-gray-600 z-1 px-2.5 py-2 overflow-hidden"
    >
      <TouchableOpacity
        onPress={closeToast}
        className="flex-row items-center justify-center"
      >
        {icons[type]}
        <View className=" max-w-[80%] mx-2">
          <FontText className="font-bold">{message}</FontText>
          {subMessage && (
            <FontText className="font-bold text-gray-500">
              {subMessage}
            </FontText>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Toast;
