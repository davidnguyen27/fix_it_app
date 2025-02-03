import { useRouter } from "expo-router";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";

const Landing = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/landing.png")}
      resizeMode="cover"
      className="flex flex-1"
    >
      <View
        className="absolute bottom-20 left-8 right-8 rounded-3xl px-8 pt-5 pb-9 flex-row items-center justify-between"
        style={{ backgroundColor: "rgba(74, 98, 138, 0.72)" }}
      >
        <View className="flex-1">
          <Text className="text-white text-[18px] font-unbounded leading-tight">
            Convenient Repairs {"\n"} Dedicated Service
          </Text>
        </View>

        <TouchableOpacity
          className="bg-[#B9E5E8] w-[66px] h-[57px] rounded-[22px] items-center justify-center"
          onPress={() => router.push("/screens/sign-up")}
        >
          <Image
            source={require("../assets/icons/arrow_right.png")}
            className="size-8"
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Landing;
