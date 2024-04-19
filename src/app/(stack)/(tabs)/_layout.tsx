import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { COLOR, FONT } from "@/constants";
import NavBarIcon from "@/components/layout/NavBarIcon";
import { Role, useAuth } from "@/hooks/auth/AuthContext";

interface TabConfig {
  name: string;
  role?: Role;
  title: string;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
}

const tabScreens: TabConfig[] = [
  { name: "map", title: "Map", icon: "map-marker" },
  {
    name: "contribute",
    role: Role.USER,
    title: "Contribute",
    icon: "commenting",
  },
  { name: "admin", role: Role.ADMIN, title: "Admin", icon: "key" },
  { name: "profile", title: "Profile", icon: "vcard" },
];

const Layout = () => {
  const { user } = useAuth();

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
          redirect={screen.role && user?.role !== screen.role}
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
