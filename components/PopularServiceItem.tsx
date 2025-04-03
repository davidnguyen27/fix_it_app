import AntDesign from "@expo/vector-icons/AntDesign";
import { Heart } from "iconsax-react-native";
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from "react-native";
import { GestureResponderEvent } from "react-native";

interface PopularServiceItemProps {
  onPress: (event: GestureResponderEvent) => void;
  image: ImageSourcePropType;
}

const PopularServiceItem = ({ onPress, image }: PopularServiceItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="mr-4 rounded-lg w-[274px] relative">
      <Image source={image} className="w-full" />
      <View className="absolute top-3 left-2 bg-[#B9E5E8] px-4 py-1 rounded-[20px] flex-row items-center">
        <AntDesign name="star" size={16} color="#FBFF00" />
        <Text className="text-[13px] text-[#4A628A] font-unbounded ml-2">4.8</Text>
      </View>
      <TouchableOpacity className="absolute top-3 right-4 bg-[#D9D9D9] p-1.5 rounded-full">
        <Heart size="16" color="#f43333" variant="Bold" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PopularServiceItem;
