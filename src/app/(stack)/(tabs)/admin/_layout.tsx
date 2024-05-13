import React from "react";
import { Stack } from "expo-router";

const AdminLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Admin", headerShown: false }}
      />
      <Stack.Screen
        name="[formId]"
        options={{ headerTitle: "FormData", headerShown: false }}
      />
    </Stack>
  );
};

export default AdminLayout;
