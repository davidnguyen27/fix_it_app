import Button from "@/components/Button";
import icons from "@/constants/icons";
import ActionIcon from "@/components/ActionIcon";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image, ImageBackground, Linking } from "react-native";
import { useState } from "react";
import { bookingService } from "@/services/bookings.service";

const PaymentMethod = () => {
  const router = useRouter();
  const params = useLocalSearchParams(); // Nhận bookingData từ màn hình trước
  const [selectedMethod, setSelectedMethod] = useState<string | null>("vnpay");

  const handleConfirmPayment = async () => {
    if (!selectedMethod) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    // Kiểm tra dữ liệu trước khi gửi API
    const requestData = {
      CustomerId: params.CustomerId as string,
      ServiceId: params.ServiceId as string,
      WorkingDate: params.WorkingDate as string,
      Address: params.Address as string,
      WorkingTime: params.WorkingTime as string,
    };

    console.log("📡 Sending booking request:", requestData);

    try {
      // Gửi request tạo booking
      const bookingResponse = await bookingService(requestData);
      console.log("📌 API Response:", bookingResponse);

      // Kiểm tra nếu API trả về URL thanh toán
      if (bookingResponse) {
        console.log("🔗 Redirecting to:", bookingResponse);
        Linking.openURL(bookingResponse);
      } else {
        alert("Lỗi khi lấy URL thanh toán!");
      }
    } catch (error: any) {
      console.error("❌ Lỗi khi xác nhận thanh toán:", error.response?.data || error.message);
      alert("Thanh toán thất bại, vui lòng thử lại!");
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/bg-signup.png")}
      resizeMode="cover"
      className="flex-1 justify-center"
    >
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="mt-8">
          <ActionIcon
            icon={icons.arrowLeft}
            backgroundColor="bg-[#4A628A]"
            tintColor="#DFF2EB"
            onPress={() => router.back()}
          />
          <Text className="text-[20px] text-center font-unbounded">Payment Methods</Text>
        </View>

        {/* Payment List */}
        <View className="mt-6 space-y-2">
          {/* Cash */}
          <TouchableOpacity
            className={`flex-row items-center justify-between p-4 rounded-lg border ${
              selectedMethod === "cash" ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"
            }`}
            onPress={() => setSelectedMethod("cash")}
          >
            <View className="flex-row items-center space-x-3">
              <Image source={require("../../../assets/icons/money.png")} />
              <Text className="text-base font-medium">Cash</Text>
            </View>
            <View
              className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === "cash" ? "border-blue-500 bg-blue-500" : "border-gray-300"
              }`}
            />
          </TouchableOpacity>

          {/* Wallet */}
          <TouchableOpacity
            className={`flex-row items-center justify-between p-4 rounded-lg border ${
              selectedMethod === "wallet"
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300 bg-white"
            }`}
            onPress={() => setSelectedMethod("wallet")}
          >
            <View className="flex-row items-center space-x-3">
              <Image source={require("../../../assets/icons/wallet-remove.png")} />
              <Text className="text-base font-medium">Wallet</Text>
            </View>
            <View
              className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === "wallet" ? "border-blue-500 bg-blue-500" : "border-gray-300"
              }`}
            />
          </TouchableOpacity>

          {/* Credit & Debit Card */}
          <TouchableOpacity
            className={`flex-row items-center justify-between p-4 rounded-lg border ${
              selectedMethod === "card" ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"
            }`}
            onPress={() => setSelectedMethod("card")}
          >
            <View className="flex-row items-center space-x-3">
              <Image source={require("../../../assets/icons/card-add.png")} />
              <Text className="text-base font-medium">Add Card</Text>
            </View>
            <Image source={icons.arrowRight} />
          </TouchableOpacity>

          {/* MoMo */}
          <TouchableOpacity
            className={`flex-row items-center justify-between p-4 rounded-lg border ${
              selectedMethod === "momo" ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"
            }`}
            onPress={() => setSelectedMethod("momo")}
          >
            <View className="flex-row items-center space-x-3">
              <Image
                source={require("../../../assets/icons/momo.png")}
                className="w-6 h-6"
                resizeMode="contain"
              />
              <Text className="text-base font-medium">Momo</Text>
            </View>
            <View
              className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === "momo" ? "border-blue-500 bg-blue-500" : "border-gray-300"
              }`}
            />
          </TouchableOpacity>

          {/* VNPay */}
          <TouchableOpacity
            className={`flex-row items-center justify-between p-4 rounded-lg border ${
              selectedMethod === "vnpay"
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300 bg-white"
            }`}
            onPress={() => setSelectedMethod("vnpay")}
          >
            <View className="flex-row items-center space-x-3">
              <Image
                source={require("../../../assets/icons/vnpay.png")}
                className="w-6 h-6"
                resizeMode="contain"
              />
              <Text className="text-base font-medium">VnPay</Text>
            </View>
            <View
              className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === "vnpay" ? "border-blue-500 bg-blue-500" : "border-gray-300"
              }`}
            />
          </TouchableOpacity>

          {/* Apple Pay */}
          <TouchableOpacity
            className={`flex-row items-center justify-between p-4 rounded-lg border ${
              selectedMethod === "applepay"
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300 bg-white"
            }`}
            onPress={() => setSelectedMethod("applepay")}
          >
            <View className="flex-row items-center space-x-3">
              <Image
                source={require("../../../assets/icons/apple-pay.png")}
                className="w-6 h-6"
                resizeMode="contain"
              />
              <Text className="text-base font-medium">Apple Pay</Text>
            </View>
            <View
              className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === "applepay" ? "border-blue-500 bg-blue-500" : "border-gray-300"
              }`}
            />
          </TouchableOpacity>
        </View>

        {/* Confirm button */}
        <View className="mt-8">
          <TouchableOpacity
            onPress={handleConfirmPayment}
            className="bg-[#4A628A] py-4 rounded-full"
          >
            <Text className="text-white text-center text-lg font-bold">Confirm Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default PaymentMethod;
