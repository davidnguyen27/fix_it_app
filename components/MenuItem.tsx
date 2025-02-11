import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";

interface MenuItemProps {
  icon: ImageSourcePropType;
  title: string;
  mingcuteRight: ImageSourcePropType;
  onPress: () => void;
}

const MenuItem = ({ icon, title, mingcuteRight, onPress }: MenuItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-4 border-b border-[#C5C5C5]"
    >
      <View className="flex-row items-center">
        <Image className="mr-4" source={icon} />
        <Text className="font-unbounded text-[16px]">{title}</Text>
      </View>
      <Image source={mingcuteRight} />
    </TouchableOpacity>
  );
};

export default MenuItem;
