import { Tabs } from "expo-router";
import { Image, Text, View, ImageSourcePropType } from "react-native";

interface TabIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}

const TabIcon = ({ focused, icon, title }: TabIconProps) => (
  <View className="flex flex-col items-center">
    <Image
      source={icon}
      style={{
        tintColor: focused ? "#0061FF" : "#666876",
        width: 24,
        height: 24,
      }}
      resizeMode="contain"
    />
    <Text
      style={{
        color: focused ? "#0061FF" : "#666876",
        fontSize: 12,
        fontFamily: focused ? "Rubik-Medium" : "Rubik-Regular",
        marginTop: 4,
        textAlign: "center",
      }}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  const icons = {
    home: require("../../../assets/icons/home.png"),
    bookmark: require("../../../assets/icons/bag.png"),
    explore: require("../../../assets/icons/search.png"),
    chat: require("../../../assets/icons/message_notif.png"),
    profile: require("../../../assets/icons/user.png"),
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#F8F8F8",
          position: "absolute",
          borderTopColor: "#E0E0E0",
          borderTopWidth: 1,
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.bookmark} focused={focused} title="Bookmark" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.explore} focused={focused} title="Explore" />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.chat} focused={focused} title="Chat" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.profile} focused={focused} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
