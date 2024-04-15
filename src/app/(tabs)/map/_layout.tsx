import React from "react";
import { Stack } from "expo-router";

const MapLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Map", headerShown: false }}
      />
    </Stack>
  );
};

export default MapLayout;
