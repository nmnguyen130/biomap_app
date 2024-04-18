import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { COLOR, FONT } from "@/constants";
import NavBarIcon from "@/components/layout/NavBarIcon";

interface TabConfig {
  name: string;
  title: string;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
}

const tabScreens: TabConfig[] = [
  { name: "map", title: "Map", icon: "map-marker" },
  { name: "contribute", title: "Contribute", icon: "commenting" },
  { name: "profile", title: "Profile", icon: "vcard" },
];

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLOR.primary,
        tabBarLabelStyle: { fontFamily: FONT.bold, paddingBottom: 2 },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      {tabScreens.map((screen, index) => (
        <Tabs.Screen
          key={index}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ color, focused }) => (
              <NavBarIcon
                focused={focused}
                label={screen.title}
                name={screen.icon}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default Layout;
