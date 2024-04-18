import { IMAGES } from "@/constants";
import { Image, View, ViewProps } from "react-native";
import FontText from "./FontText";

const BiomapLogo = (props: ViewProps) => {
  const { className, ...otherProps } = props;
  return (
    <View className={`flex-col items-center ${className}`} {...otherProps}>
      <Image source={IMAGES.pawlogo} className="w-36 h-[122px] mb-3" />
      <FontText className="text-lighter_primary text-4xl font-bold">
        Bio
        <FontText className="text-yellow-500 text-4xl font-bold">Map</FontText>
      </FontText>
    </View>
  );
};

export default BiomapLogo;
