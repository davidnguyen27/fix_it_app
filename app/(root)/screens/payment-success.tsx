import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { TickCircle } from "iconsax-react-native";
import { View, Text, ImageBackground } from "react-native";

const PaymentSuccess = () => {
  const router = useRouter();

  return (
    <ImageBackground source={require("../../../assets/images/bg-signup.png")} className="flex-1 items-center px-4">
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

      <Button title="View E-Receipt" backgroundColor="bg-[#131A24]" onPress={() => console.log("Button")} />
      <Button
        title="View My Booking"
        backgroundColor="bg-[#131A24]"
        onPress={() => router.push("/screens/my-booking")}
      />
      <Button title="Continue" backgroundColor="bg-[#131A24]" onPress={() => router.push("/profile")} />
    </ImageBackground>
  );
};

export default PaymentSuccess;
