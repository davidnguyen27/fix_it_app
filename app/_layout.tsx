import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import GlobalProvider from "@/context/GlobalProvider";

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    "Unbounded-Bold": require("../assets/fonts/Unbounded-Bold.ttf"),
    "Unbounded-Light": require("../assets/fonts/Unbounded-Light.ttf"),
    "Unbounded-Medium": require("../assets/fonts/Unbounded-Medium.ttf"),
    "Unbounded-Regular": require("../assets/fonts/Unbounded-Regular.ttf"),
    "Unbounded-SemiBold": require("../assets/fonts/Unbounded-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GlobalProvider>
      <Toast />
      <Stack screenOptions={{ headerShown: false }} />
    </GlobalProvider>
  );
}
