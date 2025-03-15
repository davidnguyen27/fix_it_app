import { useEffect } from "react";
import { View, Text, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "../services/auth.service";

const LoadingScreen = () => {
  useEffect(() => {
    const getTokens = async () => {
      const accessToken = await AsyncStorage.getItem("AccessToken");
      const refreshToken = await AsyncStorage.getItem("RefreshToken");
      if (accessToken && refreshToken) {
        const response = await authService.refreshTokens(accessToken, refreshToken);
        await AsyncStorage.setItem("AccessToken", response.AccessToken);
        await AsyncStorage.setItem("RefreshToken", response.RefreshToken);
      }
    };

    getTokens();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/landing.png")}
      resizeMode="cover"
      className="flex-1"
    >
      <View className="absolute bottom-10 left-4 right-4 bg-[#4A628A] bg-opacity-75 rounded-3xl p-5 justify-center items-center">
        <Text className="text-white text-2xl font-semibold text-center leading-8 tracking-wide">
          Convenient Repairs {"\n"} Dedicated Service
        </Text>
      </View>
    </ImageBackground>
  );
};

export default LoadingScreen;
