import { View, Image, ImageSourcePropType, Pressable } from "react-native";
import FontText from "../common/FontText";
import { COLOR } from "@/constants";

export type SearchResultItemProps = {
  name: string;
  imageSource?: ImageSourcePropType;
};

const SearchResultItem = (props: SearchResultItemProps) => {
  const { imageSource, name } = props;
  return (
    <Pressable
      android_ripple={{
        color: COLOR.grey,
        borderless: false,
        foreground: true,
      }}
      onPress={() => {}}
      className="rounded-xl overflow-hidden shadow-xl shadow-gray-400 bg-white my-1 mx-5 px-3 py-1"
    >
      <View className="flex-row items-center gap-4 bg-white my-2">
        {imageSource && (
          <Image source={imageSource} className="w-24 h-24 rounded-xl" />
        )}
        <View className="flex-1 gap-1">
          <FontText className="font-bold text-xl text-darkblack">
            {name}
          </FontText>
        </View>
      </View>
    </Pressable>
  );
};

export default SearchResultItem;
