import { useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Slot, useRouter, useSegments } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout() {
  const { user, isLoading } = useGlobalContext();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const isAccessingTabs = segments[1] === "(tabs)";

    if (!isLoading && !user && isAccessingTabs) {
      router.replace("/");
    }
  }, [user, isLoading, segments]);

  if (isLoading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="#4A628A" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <Slot />
    </SafeAreaView>
  );
}
