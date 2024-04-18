import React from "react";
import { Stack } from "expo-router";

const ContributeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "User", headerShown: false }}
      />
      <Stack.Screen
        name="[id]"
        options={{ headerTitle: "FormData", headerShown: false }}
      />
    </Stack>
  );
};

export default ContributeLayout;
