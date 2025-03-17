import { ReactNode } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

interface MenuItemProps {
  icon: ReactNode;
  title: string;
  mingcuteRight: ReactNode;
  onPress: () => void;
}

const MenuItem = ({ icon, title, mingcuteRight, onPress }: MenuItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-4 border-b border-[#C5C5C5]"
    >
      <View className="flex-row items-center">
        {icon}
        <Text className="font-unbounded text-[16px] ml-4">{title}</Text>
      </View>
      {mingcuteRight}
    </TouchableOpacity>
  );
};

export default MenuItem;
