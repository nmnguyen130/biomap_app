import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useAuth } from "@/hooks/auth/AuthContext";

import { ContributedList, CountBox } from "@/components/contribute";
import { COLOR } from "@/constants";
import { getNumberFormWithStatus } from "@/api/FormApi";
import { FontText } from "@/components/common";

const UserContributed = () => {
  const { user } = useAuth();
  const [counts, setCounts] = useState({ total: 0, approved: 0, pending: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [total, approved, pending] = await Promise.all([
          getNumberFormWithStatus(user?.userId),
          getNumberFormWithStatus(user?.userId, "approved"),
          getNumberFormWithStatus(user?.userId, "pending"),
        ]);

        setCounts({
          total,
          approved,
          pending,
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

      <CountBox
        total={counts.total}
        approved={counts.approved}
        pending={counts.pending}
      />

      <ContributedList />
    </SafeAreaView>
  );
};

export default UserContributed;
