import { View } from "react-native";
import LottieView from "lottie-react-native";

interface Props {
  width: number;
  height: number;
}

const Loader: React.FC<Props> = ({ width, height }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <LottieView
        style={{ width: width, height: height }}
        source={require("@assets/data/pawLoader.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loader;
