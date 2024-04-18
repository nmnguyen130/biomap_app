import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { FilterSVG } from "../svg";
import { FontText } from "../common";

const FilterButton = (props: TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      className="flex-row gap-2 rounded-full p-2 bg-primary"
      {...props}
    >
      <FilterSVG />
      <FontText className="color-white">Filters</FontText>
    </TouchableOpacity>
  );
};

export default FilterButton;
