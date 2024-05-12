import { ReactNode, createContext, useContext, useState } from "react";
import { DialogOption, MessageType } from "@/components/common/modal/Dialog";

interface ModalContent {
  dialogOption: DialogOption;
  dialogType: MessageType;
  title?: string;
  content?: string;
}

export enum DisplayMode {
  Dialog,
  Checklist,
}

const ModalContext = createContext<{
  displayMode: DisplayMode;
  isOpen: boolean;
  modalContent: ModalContent;
  show(mode: DisplayMode, content?: ModalContent, onClose?: () => void): void;
  hide(): void;
  cancel(): void;
  dataList: string[];
}>({
  displayMode: DisplayMode.Dialog,
  isOpen: false,
  modalContent: {
    dialogOption: DialogOption.Single,
    dialogType: MessageType.Success,
  },
  show: () => {},
  hide: () => {},
  cancel: () => {},
  dataList: [],
});

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState(DisplayMode.Dialog);
  const [modalContent, setModalContent] = useState<ModalContent>({
    dialogOption: DialogOption.Single,
    dialogType: MessageType.Success,
  });
  const [dataList, setDataList] = useState<string[]>([]);
  const [onCloseCallback, setOnCloseCallback] = useState<() => void>();

  const showModal = (
    mode: DisplayMode,
    content?: ModalContent,
    onClose?: () => void
  ) => {
    setDisplayMode(mode);
    if (content) {
      setModalContent(content);
    }
    if (onClose) {
      setOnCloseCallback(() => onClose);
    }

    setIsOpen(true);
  };

  const hideModal = (data?: string[]) => {
    setIsOpen(false);
    if (data) {
      setDataList(data);
    }
    if (onCloseCallback) {
      onCloseCallback();
      setOnCloseCallback(undefined);
    }
  };

  const cancelModal = () => {
    setIsOpen(false);
  };

  const value = {
    displayMode,
    isOpen,
    modalContent,
    show: showModal,
    hide: hideModal,
    cancel: cancelModal,
    dataList,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { useModal, ModalProvider };
