import { Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const StackLayout = () => {
  return (
    <BottomSheetModalProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(data)/[creatureName]" />
        <Stack.Screen name="(modals)/[provinceName]" />
        <Stack.Screen name="(modals)/form" />
      </Stack>
    </BottomSheetModalProvider>
  );
};

export default StackLayout;
