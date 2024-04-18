import { View } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { DocumentData } from "@firebase/firestore";

import { Loader } from "@/components/common";
import { FormInforBody, FormInforHeader } from "@/components/contribute";
import { getFormDataById } from "@/api/FormApi";

const FormData = () => {
  const { formId } = useLocalSearchParams<{ formId: string }>();

  const [formInfor, setFormInfor] = useState<DocumentData>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!formId) {
          throw new Error("Missing formId from search params");
        }
        const formInfor = await getFormDataById(formId);

        if (formInfor) setFormInfor(formInfor);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {Object.keys(formInfor).length > 0 ? (
        <View className="flex-1 p-3">
          <FormInforHeader formData={formInfor} />
          <FormInforBody formData={formInfor} />
        </View>
      ) : (
        <Loader width={450} height={450} />
      )}
    </SafeAreaView>
  );
};

export default FormData;
