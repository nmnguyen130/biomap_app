import { View, FlatList, ViewProps } from "react-native";
import SearchResultItem, { SearchResultItemProps } from "./SearchResultItem";
import { SearchResultType } from "@/app/(stack)/(tabs)/map";

type SearchResultsProps = {
  type: SearchResultType;
  searchResultArray: SearchResultItemProps[];
} & ViewProps;

const SearchResults = (props: SearchResultsProps) => {
  const { type, searchResultArray, className, ...otherProps } = props;

  return (
    <View
      className={`flex-row bg-white mx-2 rounded-xl ${className}`}
      {...otherProps}
    >
      <FlatList
        contentContainerStyle={{ paddingBottom: 4 }}
        data={searchResultArray}
        renderItem={({ item }) => (
          <SearchResultItem
            imageSource={item.imageSource}
            name={item.name}
            scientificName={item.scientificName}
            type={item.type}
          />
        )}
      />
    </View>
  );
};

export default SearchResults;
