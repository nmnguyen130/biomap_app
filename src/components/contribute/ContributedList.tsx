import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { DocumentData } from "@firebase/firestore";

import { Role, useAuth } from "@/hooks/auth/AuthContext";
import { getFormsDataByUserId } from "@/api/FormApi";

type Props = {
  onCloseModal?: () => void;
};

const ContributedList = ({ onCloseModal }: Props) => {
  const { user } = useAuth();
  const [formsData, setFormsData] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data =
          user?.role == Role.USER
            ? await getFormsDataByUserId(user?.userId as string)
            : await getFormsDataByUserId();
        setFormsData(data);
      } catch (error) {
        console.error(`Error get form data by ${user?.role}:`, error);
      }
    };

    fetchData();
  }, []);

  return (
    <View className="h-5/6 m-2">
      <FlatList
        data={formsData}
        renderItem={({ item }) => (
          <>
            <View className="border-2 border-lighter_primary rounded-2xl ms-4 me-9 my-2.5">
              <View className="p-3.5">
                <Text className="text-lg font-medium">{item.name}</Text>
                <Text className="text-gray-400 text-xs">
                  Posted {user?.role === Role.USER ? "" : `by ${item.username}`}
                  : {item.submissionDate}
                </Text>
              </View>
            </View>
            <View className="bg-lighter_primary rounded-full absolute right-4 top-6 w-12 h-12 items-center justify-center">
              <TouchableOpacity
                className="bg-primary items-center justify-center h-11 w-11 rounded-full"
                onPress={() => {
                  onCloseModal && onCloseModal();
                  router.push({
                    pathname: `(tabs)/${
                      user?.role === Role.USER
                        ? "contribute/[id]"
                        : "admin/[formId]"
                    }`,
                    params: { formId: item.formId },
                  });
                }}
              >
                <MaterialIcons
                  name="keyboard-double-arrow-right"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      />
    </View>
  );
};

export default ContributedList;
