import { useLocalSearchParams } from "expo-router";

import { FormData } from "@/components/contribute";
import { ModalProvider } from "@/hooks/ModalContext";

const FormDataScreen = () => {
  const { formId } = useLocalSearchParams<{ formId: string }>();

  if (!formId) throw new Error("Missing formId from search params");

  return (
    <ModalProvider>
      <FormData formId={formId} />
    </ModalProvider>
  );
};

export default FormDataScreen;
