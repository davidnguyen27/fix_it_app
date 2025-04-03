import ButtonGradient from "@/components/ButtonGradient";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { TickCircle } from "iconsax-react-native";
import { View, Text } from "react-native";

const PaymentSuccess = () => {
  const router = useRouter();

  return (
    <LinearGradient colors={["#DFF2EB87", "#4A628A87"]} locations={[0, 0.92]} className="flex-1 items-center px-4">
      {/* Icon Check */}
      <View className="mt-6">
        <TickCircle size="272" color="#4a628a" variant="Bold" />
      </View>

      {/* Tiêu đề */}
      <Text className="text-[32px] font-unbounded-medium text-center mb-2">Congratulations!</Text>
      <Text className="text-[13px] font-unbounded-light text-center mb-6 px-4">
        Your Electric Repair Service Booked!{"\n"}
        You can check your booking on the menu profile.
      </Text>

      <ButtonGradient title="View E-Receipt" colors={["#3E586A", "#131A24"]} onPress={() => console.log("Button")} />
      <ButtonGradient
        title="View My Booking"
        colors={["#3E586A", "#131A24"]}
        onPress={() => router.push("/screens/my-booking")}
      />
      <ButtonGradient title="Continue" colors={["#3E586A", "#131A24"]} onPress={() => router.push("/profile")} />
    </LinearGradient>
  );
};

export default PaymentSuccess;
