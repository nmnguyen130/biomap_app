import { View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type Props = {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  focused: boolean;
  label: string;
};

// You can explore the built-in icon families and icons on the web at https://oblador.github.io/react-native-vector-icons/
const NavBarIcon = (props: Props) => {
  return (
    <View className="flex justify-center items-center">
      <FontAwesome size={props.focused ? 30 : 26} {...props} />
    </View>
  );
};

export default NavBarIcon;
