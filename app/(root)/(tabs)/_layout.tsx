import { Tabs, usePathname } from "expo-router";
import { Bag2, Home2, MessageNotif, SearchNormal1, User } from "iconsax-react-native";
import { ReactNode } from "react";
import { Text, View } from "react-native";

interface TabIconProps {
  icon: ReactNode;
  title: string;
}

const TabIcon = ({ icon, title }: TabIconProps) => (
  <View className="flex items-center justify-center space-y-1">
    {icon}
    <Text
      className="font-unbounded-light text-[10px] text-white w-full text-center"
      numberOfLines={1}
      ellipsizeMode="clip"
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  const pathname = usePathname();

  const shouldHideTabBar = pathname.includes("/chat");

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#4A628A",
          position: "absolute",
          borderTopLeftRadius: 17,
          borderTopRightRadius: 17,
          paddingTop: 17,
          paddingBottom: 17,
          height: 72,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 6,
          display: shouldHideTabBar ? "none" : "flex",
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: () => <TabIcon icon={<Home2 size="32" color="#dff2eb" variant="Bold" />} title="Home" />,
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarIcon: () => <TabIcon icon={<Bag2 size="32" color="#dff2eb" variant="Bold" />} title="Bookmark" />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: () => (
            <TabIcon icon={<SearchNormal1 size="32" color="#dff2eb" variant="Bold" />} title="Explore" />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: () => <TabIcon icon={<MessageNotif size="32" color="#dff2eb" variant="Bold" />} title="Chat" />,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: () => <TabIcon icon={<User size="32" color="#dff2eb" variant="Bold" />} title="Profile" />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
