import { useGlobalContext } from "@/context/GlobalProvider";
import { Redirect, Slot, usePathname } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const pathname = usePathname();
  const { isLoading, isLoggedIn } = useGlobalContext();

  const publicRoutes = ["/landing", "/sign-up", "/sign-in"];

  if (isLoading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (isLoggedIn && publicRoutes.includes(pathname)) {
    return <Redirect href="/(root)/(tabs)" />;
  }

  // Nếu chưa đăng nhập và đang ở trang không public, chuyển hướng đến trang landing
  if (!isLoggedIn && !publicRoutes.includes(pathname)) {
    return <Redirect href="/landing" />;
  }

  return <Slot />;
}
