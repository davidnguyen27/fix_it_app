import { View, Text, TouchableOpacity, Image } from "react-native";

import { GestureResponderEvent } from "react-native";

interface PopularServiceItemProps {
  onPress: (event: GestureResponderEvent) => void;
}

const PopularServiceItem = ({ onPress }: PopularServiceItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="mr-4 rounded-lg w-[274px] relative">
      <Image source={require("../assets/images/popular_service_1.png")} className="w-full" />
      <View className="absolute top-3 left-2 bg-[#B9E5E8] px-4 py-1 rounded-[20px] flex-row items-center">
        <Image source={require("../assets/icons/star.png")} className="mr-2" />
        <Text className="text-[13px] text-[#4A628A] font-unbounded">4.8</Text>
      </View>
      <TouchableOpacity className="absolute top-3 right-4 bg-[#D9D9D9] p-1.5 rounded-full">
        <Image source={require("../assets/icons/heart.png")} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};


export default PopularServiceItem;
