import { useState, useEffect } from "react";
import { View } from "react-native";
import { Redirect } from "expo-router";
import { Loader } from "@/components";

const SplashScreen = () => {
  return (
    <View className="flex-1">
      <Loader width={500} height={500} />
    </View>
  );
};

const MainScreen = () => <Redirect href={"(tabs)"} />;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <SplashScreen /> : <MainScreen />;
};

export default App;
