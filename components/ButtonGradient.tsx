import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonGradientProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  colors: [string, string];
}

const ButtonGradient = ({ title, onPress, colors }: ButtonGradientProps) => {
  return (
    <LinearGradient
      colors={colors}
      locations={[0, 1]}
      className="px-4 py-3 mx-auto mt-10 w-[287px] items-center"
      style={{ borderRadius: 15 }}
    >
      <TouchableOpacity onPress={onPress}>
        <Text className="text-[#DFF2EB] font-unbounded-medium text-[13px]">{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ButtonGradient;
