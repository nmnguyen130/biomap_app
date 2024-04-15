import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "@/constants/theme";

// Define a union type for the allowed icon names
type IconName =
  | "paw-outline"
  | "head-lightbulb-outline"
  | "card-account-details-outline";

interface TabConfig {
  name: string;
  title: string;
  icon: IconName;
}

const tabScreens: TabConfig[] = [
  { name: "map", title: "Map", icon: "paw-outline" },
  { name: "contribute", title: "Contribute", icon: "head-lightbulb-outline" },
  { name: "profile", title: "Profile", icon: "card-account-details-outline" },
];

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: { fontFamily: "PTSer" },
        headerShown: false,
      }}
    >
      {tabScreens.map((screen, index) => (
        <Tabs.Screen
          key={index}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name={screen.icon}
                size={size}
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
