import { Stack } from "expo-router";
import { Host } from "react-native-portalize";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const StackLayout = () => {
  return (
    <Host>
      <BottomSheetModalProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
      </BottomSheetModalProvider>
    </Host>
  );
};

export default StackLayout;
