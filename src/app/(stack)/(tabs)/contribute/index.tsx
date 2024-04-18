import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { ContributedList } from "@/components/contribute";
import { COLOR } from "@/constants";
import { getNumberFormWithStatus } from "@/api/FormApi";
import { FontText } from "@/components/common";

const UserContributed = () => {
  const [counts, setCounts] = useState({ total: 0, approved: 0, pending: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCounts({
          total: (await getNumberFormWithStatus()) as number,
          approved: (await getNumberFormWithStatus("approved")) as number,
          pending: (await getNumberFormWithStatus("pending")) as number,
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 8 }}
    >
      <View className="flex-row items-center justify-between my-2">
        <FontText className="text-3xl ms-6">Đóng góp của bạn</FontText>
        <TouchableOpacity
          className="border border-darker_primary rounded-full me-6 p-2"
          onPress={() => router.replace("(modals)/form")}
        >
          <Ionicons name="add" size={24} color={COLOR.darker_primary} />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-around mx-2.5 my-0.5">
        <View className="flex-row w-max justify-around items-center border border-blue-500 rounded-lg px-1">
          <MaterialCommunityIcons
            className="px-1"
            name="upload"
            size={24}
            color={COLOR.blue}
          />
          <Text className="text-blue-500 pe-3">Tổng: {counts.total}</Text>
        </View>

        <View className="flex-row w-1/4 justify-around items-center border border-lighter_primary rounded-lg p-3">
          <MaterialCommunityIcons
            name="checkbox-marked-circle-outline"
            size={24}
            color={COLOR.lighter_primary}
          />
          <Text className="text-lighter_primary">{counts.approved}</Text>
        </View>

        <View className="flex-row w-1/4 justify-around items-center border border-yellow-500 rounded-lg p-3">
          <MaterialCommunityIcons
            name="progress-clock"
            size={24}
            color={COLOR.orange}
          />
          <Text className="text-yellow-500">{counts.pending}</Text>
        </View>
      </View>

      <ContributedList />
    </SafeAreaView>
  );
};

export default UserContributed;
