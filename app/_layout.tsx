import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import GlobalProvider from "@/context/GlobalProvider";
import LandingScreen from "./landing"; // Import LoadingScreen component

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    "Unbounded-Bold": require("../assets/fonts/Unbounded-Bold.ttf"),
    "Unbounded-Light": require("../assets/fonts/Unbounded-Light.ttf"),
    "Unbounded-Medium": require("../assets/fonts/Unbounded-Medium.ttf"),
    "Unbounded-Regular": require("../assets/fonts/Unbounded-Regular.ttf"),
    "Unbounded-SemiBold": require("../assets/fonts/Unbounded-SemiBold.ttf"),
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => {
        setIsLoading(false);
        SplashScreen.hideAsync();
      }, 3000);
    }
  }, [fontsLoaded]);

  if (isLoading) {
    return <LandingScreen />;
  }

  return (
    <GlobalProvider>
      <Toast />
      <Stack screenOptions={{ headerShown: false }} />
    </GlobalProvider>
  );
}
