import "../global.css";
import { useEffect } from "react";
import { SplashScreen, Stack, router, useSegments } from "expo-router";
import { AuthContextProvider, useAuth } from "@/hooks/auth/AuthContext";
import useFontLoader from "@/hooks/useFontLoader";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { loaded } = useFontLoader();

  if (!loaded) {
    return null;
  }

  return (
    <AuthContextProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </AuthContextProvider>
  );
};

function RootLayoutNav() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const inTabsGroup = segments[0] === "(tabs)";
    if (isAuthenticated && !inTabsGroup) {
      // Redirect to Map
      router.replace("(tabs)/map");
    } else if (isAuthenticated === false) {
      // Redirect to Login
      router.replace("(auth)/login");
    }
  }, [isAuthenticated]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(stack)" />
    </Stack>
  );
}

export default RootLayout;
