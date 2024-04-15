import { ReactNode, createContext, useContext, useState } from "react";
import { MessageType } from "@/components/Dialog";

interface ModalContent {
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
  show(mode: DisplayMode, content?: ModalContent): void;
  hide(): void;
  dataList: string[];
}>({
  displayMode: DisplayMode.Dialog,
  isOpen: false,
  modalContent: { dialogType: MessageType.Success },
  show: () => {},
  hide: () => {},
  dataList: [],
});

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState(DisplayMode.Dialog);
  const [modalContent, setModalContent] = useState<ModalContent>({
    dialogType: MessageType.Success,
  });
  const [dataList, setDataList] = useState<string[]>([]);

  const showModal = (mode: DisplayMode, content?: ModalContent) => {
    setDisplayMode(mode);
    if (content) {
      setModalContent(content);
    }

    setIsOpen(true);
  };

  const hideModal = (data?: string[]) => {
    setIsOpen(false);
    if (data) {
      setDataList(data);
    }
  };

  const value = {
    displayMode,
    isOpen,
    modalContent,
    show: showModal,
    hide: hideModal,
    dataList,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { useModal, ModalProvider };
