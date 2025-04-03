import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
}

const Button = ({ title, onPress, backgroundColor }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${backgroundColor} px-4 py-3 mx-auto mt-10 w-[287px] rounded-[15px] items-center`}
    >
      <Text className="text-[#DFF2EB] font-unbounded-medium text-[13px]">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
