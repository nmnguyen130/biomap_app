import { FONT } from "@/constants";
import { Text, TextProps } from "react-native";

const FontText = (props: TextProps) => {
  const { style, ...otherProps } = props;
  return <Text style={[{ fontFamily: FONT.book }, style]} {...otherProps} />;
};

export default FontText;
