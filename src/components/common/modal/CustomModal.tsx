import { Modal, ModalProps, KeyboardAvoidingView, View } from "react-native";

type Props = {
  isOpen: boolean;
  withInput?: boolean;
} & ModalProps;

const CustomModal = ({ isOpen, withInput, children, ...otherProps }: Props) => {
  const content = withInput ? (
    <KeyboardAvoidingView
      className="flex-1 items-center justify-center px-3 bg-zinc-900/40"
      behavior="padding"
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View className="flex-1 items-center justify-center px-3 bg-zinc-900/40">
      {children}
    </View>
  );

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...otherProps}
    >
      {content}
    </Modal>
  );
};

export default CustomModal;
