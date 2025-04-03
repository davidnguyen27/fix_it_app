import "./global.css";
import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import GlobalProvider from "@/context/GlobalProvider";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Unbounded-Bold": require("../assets/fonts/Unbounded-Bold.ttf"),
    "Unbounded-Light": require("../assets/fonts/Unbounded-Light.ttf"),
    "Unbounded-Extra-Light": require("../assets/fonts/Unbounded-ExtraLight.ttf"),
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
      <SafeAreaProvider>
        <StatusBar style="dark" backgroundColor="transparent" translucent />
        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
      </SafeAreaProvider>
    </GlobalProvider>
  );
}
