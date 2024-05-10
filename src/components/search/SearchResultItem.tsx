import { View, Image, ImageSourcePropType, Pressable } from "react-native";
import { router } from "expo-router";

import FontText from "../common/FontText";
import { COLOR } from "@/constants";

export type SearchResultItemProps = {
  name: string;
  scientificName?: string;
  type?: string;
  imageSource?: ImageSourcePropType;
};

const SearchResultItem = (props: SearchResultItemProps) => {
  const { imageSource, name, scientificName, type } = props;

  return (
    <Pressable
      android_ripple={{
        color: COLOR.grey,
        borderless: false,
        foreground: true,
      }}
      onPress={() => {
        router.push({
          pathname: "(data)/[creatureName]",
          params: {
            creatureName: scientificName,
            type: type,
          },
        });
      }}
      className="rounded-xl overflow-hidden shadow-xl shadow-gray-400 bg-white my-1 mx-5 px-3 py-1"
    >
      <View className="flex-row items-center gap-4 bg-white my-2">
        {imageSource && (
          <Image source={imageSource} className="w-24 h-24 rounded-xl" />
        )}
        <View className="flex-1 gap-1">
          <FontText className="text-xl text-darkblack">
            {name} ({scientificName})
          </FontText>
        </View>
      </View>
    </Pressable>
  );
};

export default SearchResultItem;
