import React from "react";
import { Stack } from "expo-router";

const ContributeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "User", headerShown: false }}
      />
    </Stack>
  );
};

export default ContributeLayout;
