import { useCallback } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { ArrowRight } from "iconsax-react-native";
import { useRouter } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { images } from "@/constants/images";

const LandingScreen = () => {
  const router = useRouter();
  const { user, isLoading } = useGlobalContext();

  const handleNavigate = useCallback(() => {
    if (user) {
      router.push("/(root)/(tabs)");
    } else {
      router.push("/screens/sign-in");
    }
  }, [user, router]);

  if (isLoading) return null;

  return (
    <ImageBackground source={images.Landing} resizeMode="cover" className="flex-1">
      <View
        className="absolute flex-row bottom-16 left-4 right-4 rounded-3xl px-4 py-6 items-center justify-center"
        style={{ backgroundColor: "rgba(74, 98, 138, 0.72)" }}
      >
        <Text className="text-white text-[18px] font-unbounded leading-8 tracking-wide">
          Convenient Repairs {"\n"} Dedicated Service
        </Text>
        <TouchableOpacity className="bg-[#B9E5E8] px-4 py-3.5 rounded-2xl ml-4" onPress={handleNavigate}>
          <ArrowRight color="#F5F5F5" size={24} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LandingScreen;
