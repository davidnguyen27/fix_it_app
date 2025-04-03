import ActionIcon from "@/components/ActionIcon";
import { ArrowLeft } from "iconsax-react-native";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const EnterAmount = () => {
  const router = useRouter();
  const [amount, setAmount] = useState<string>("");

  const handleConfirm = () => {
    const numericAmount = parseInt(amount, 10);
    if (!numericAmount || numericAmount <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ!");
      return;
    }

    router.push({
      pathname: "/screens/payment-method",
      params: { amount: numericAmount.toString() },
    });
  };

  return (
    <LinearGradient colors={["#DFF2EB87", "#4A628A87"]} locations={[0, 0.92]} className="flex-1 justify-center">
      <View className="px-6">
        {/* Header */}
        <View className="mt-8">
          <ActionIcon
            icon={<ArrowLeft size="24" color="#dff2eb" variant="Outline" />}
            backgroundColor="bg-[#4A628A]"
            onPress={() => router.back()}
          />
          <Text className="text-[20px] text-center font-unbounded">Enter Amount</Text>
        </View>

        {/* Input Amount */}
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount (VND)"
          keyboardType="numeric"
          className="bg-white rounded-lg text-[18px] text-center py-4 mt-6 border border-gray-300"
        />

        {/* Confirm Button */}
        <TouchableOpacity onPress={handleConfirm} className="bg-[#4A628A] py-4 rounded-full mt-8">
          <Text className="text-white text-center text-lg font-unbounded-semiBold">Continue</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default EnterAmount;
