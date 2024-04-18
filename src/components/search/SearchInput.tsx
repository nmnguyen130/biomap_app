import { TextInput, TextInputProps, View } from "react-native";
import { SearchSVG } from "../svg";
import { COLOR } from "@/constants";

const SearchInput = (props: TextInputProps) => {
  return (
    <View className="flex-row flex-1 gap-3 items-center px-4 py-2">
      <SearchSVG />
      <View className="h-9 w-1 rounded-lg bg-primary" />
      <TextInput
        className="flex-1 font-bold text-lg placeholder:text-gray-400"
        placeholder="Search.."
        selectionColor={COLOR.primary}
        placeholderTextColor={"gray"}
        {...props}
      />
    </View>
  );
};

export default SearchInput;
