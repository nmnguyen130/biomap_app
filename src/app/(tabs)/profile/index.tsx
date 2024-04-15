import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useState } from "react";
import { useAuth } from "@/hooks/auth/AuthContext";

const ProfileScreen = () => {
  const { logout } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="h-1/3 items-center bg-lighter_primary z-10"></View>

      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;
