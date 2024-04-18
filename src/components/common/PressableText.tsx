import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import FontText from "./FontText";
import { ReactNode } from "react";

const PressableText = (
  props: { children: ReactNode } & TouchableOpacityProps
) => {
  const { children, className, ...otherProps } = props;
  return (
    <TouchableOpacity {...otherProps}>
      <FontText className={className}>{children}</FontText>
    </TouchableOpacity>
  );
};

export default PressableText;
