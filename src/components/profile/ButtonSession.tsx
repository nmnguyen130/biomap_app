import { View } from "react-native";
import { FontText, RectangleButton } from "../common";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  title: string;
  items: {
    icon: React.ComponentProps<typeof AntDesign>["name"];
    text: string;
    onPress?: () => void;
  }[];
};

const ButtonSession: React.FC<Props> = ({ title, items }) => {
  return (
    <View className="gap-1 mt-2">
      <FontText className="mb-2 text-lg text-darker_primary">{title}</FontText>
      {items.map((item, index) => (
        <RectangleButton
          key={index}
          secondary
          iconLeft={
            <AntDesign
              className="absolute left-6"
              name={item.icon}
              size={20}
              color="green"
            />
          }
          onPress={item.onPress}
          text={item.text}
        />
      ))}
    </View>
  );
};

export default ButtonSession;
