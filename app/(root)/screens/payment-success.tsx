import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { View, Text, Image, ImageBackground } from "react-native";

const PaymentSuccess = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../../assets/images/bg-signup.png")}
      className="flex-1 items-center px-4"
    >
      {/* Icon Check */}
      <View className="bg-[#4A628A] rounded-full w-[272px] h-[272px] flex items-center justify-center mb-10 mt-12">
        <Image source={require("../../../assets/icons/apple-logo.png")} />
      </View>

      {/* Tiêu đề */}
      <Text className="text-[32px] font-unbounded-medium text-center mb-2">Congratulations!</Text>
      <Text className="text-[13px] font-unbounded-light text-center mb-6 px-4">
        Your Electric Repair Service Booked!{"\n"}
        You can check your booking on the menu profile.
      </Text>

      <Button
        title="View E-Receipt"
        backgroundColor="bg-[#395061]"
        onPress={() => console.log("Button")}
      />
      <Button
        title="View My Booking"
        backgroundColor="bg-[#395061]"
        onPress={() => router.push("/screens/my-booking")}
      />
      <Button
        title="Continue"
        backgroundColor="bg-[#395061]"
        onPress={() => router.push("/profile")}
      />
    </ImageBackground>
  );
};

export default PaymentSuccess;
