import { DeviceEventEmitter } from "react-native";

export const SHOW_TOAST_EVENT_NAME = "SHOW_TOAST_MESSAGE";

export interface ToastOptionType {
  message: string;
  subMessage?: string;
  duration?: number;
  useDefaultNativeToast?: boolean;
}

export interface ToastDataType extends ToastOptionType {
  type: string;
}

export const toast = {
  infor: (options: ToastOptionType) => {
    DeviceEventEmitter.emit(SHOW_TOAST_EVENT_NAME, {
      ...options,
      type: "infor",
    });
  },
  success: (options: ToastOptionType) => {
    DeviceEventEmitter.emit(SHOW_TOAST_EVENT_NAME, {
      ...options,
      type: "success",
    });
  },
  danger: (options: ToastOptionType) => {
    DeviceEventEmitter.emit(SHOW_TOAST_EVENT_NAME, {
      ...options,
      type: "danger",
    });
  },
};
