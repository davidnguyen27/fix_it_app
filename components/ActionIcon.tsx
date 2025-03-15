import { ReactNode } from "react";
import { TouchableOpacity, Image } from "react-native";

interface ActionIconProps {
  icon: ReactNode;
  backgroundColor?: string;
  tintColor?: string;
  onPress: () => void;
}

const ActionIcon = ({ icon, backgroundColor, tintColor, onPress }: ActionIconProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${backgroundColor} size-[42px] rounded-full items-center justify-center`}
    >
      {icon}
    </TouchableOpacity>
  );
};

export default ActionIcon;
