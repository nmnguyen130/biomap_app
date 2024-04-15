import { useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { MapGesture, MapPath } from "@/components/map";

const MapScreen = () => {
  const { width, height } = useWindowDimensions();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MapGesture width={width} height={height}>
          <MapPath width={width} height={height} />
        </MapGesture>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default MapScreen;
