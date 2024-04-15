import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";

interface Props {
  children: React.ReactNode;
}

const ios = Platform.OS === "ios";

const KeyboardView: React.FC<Props> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        className="flex-1"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardView;
