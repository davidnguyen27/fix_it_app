import { View, Text, Image, ImageSourcePropType, TouchableOpacity } from "react-native";

interface CategoryItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress: () => void;
}

const CategoryItem = ({ icon, title, onPress }: CategoryItemProps) => {
  return (
    <TouchableOpacity className="items-center" onPress={onPress}>
      <View className="size-[53px] bg-[#4A628A] rounded-full flex items-center justify-center">
        <Image source={icon} />
      </View>
      <Text className="mt-1.5 font-unbounded text-[8px]">{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
