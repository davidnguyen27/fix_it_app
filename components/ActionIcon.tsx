import { TouchableOpacity, Image, ImageSourcePropType } from "react-native";

interface ActionIconProps {
  icon: ImageSourcePropType;
  backgroundColor?: string;
  tintColor?: string;
  onPress: () => void;
}

const ActionIcon = ({
  icon,
  backgroundColor,
  tintColor,
  onPress,
}: ActionIconProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${backgroundColor} size-[42px] rounded-full items-center justify-center`}
    >
      <Image source={icon} tintColor={tintColor} />
    </TouchableOpacity>
  );
};

export default ActionIcon;
