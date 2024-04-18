import { ReactNode } from "react";
import { Pressable, TouchableOpacityProps } from "react-native";
import FontText from "./FontText";

type Props = {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  text: string;
  secondary?: boolean;
  textColor?: string;
  textStyle?: string;
} & TouchableOpacityProps;

const RectangleButton = (props: Props) => {
  const {
    secondary,
    text,
    iconLeft,
    iconRight,
    textColor,
    textStyle,
    className,
    ...otherProps
  } = props;
  const finalTextColor = textColor ?? (secondary ? "black" : "white");

  return (
    <Pressable
      android_ripple={{
        color: "#3aba45",
        borderless: false,
        foreground: true,
      }}
      className={`py-4 px-3 relative ${
        secondary ? "bg-white" : "bg-primary"
      } rounded-2xl overflow-hidden shadow-lg shadow-slate-300 flex-row justify-center items-center ${className}`}
      {...otherProps}
    >
      {iconLeft && iconLeft}
      <FontText
        style={{ color: finalTextColor }}
        className={`text-center ${textStyle}`}
      >
        {text}
      </FontText>
      {iconRight && iconRight}
    </Pressable>
  );
};

export default RectangleButton;
