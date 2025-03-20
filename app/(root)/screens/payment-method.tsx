import ActionIcon from "@/components/ActionIcon";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image, ImageBackground, Modal } from "react-native";
import { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { authService } from "@/services/auth.service";
import useUser from "@/hooks/useUser";
import Button from "@/components/Button";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { ArrowLeft, ArrowRight, CardAdd, EmptyWalletRemove, Money4 } from "iconsax-react-native";
import * as Linking from "expo-linking";
>>>>>>> 40a3624 (Testing project)
=======
import { ArrowLeft, ArrowRight, CardAdd, EmptyWalletRemove, Money4 } from "iconsax-react-native";
import * as Linking from "expo-linking";
>>>>>>> theanh

const PaymentMethod = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedMethod, setSelectedMethod] = useState<string | null>("payos");
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();

  const amount = params.amount ? parseInt(params.amount as string, 10) : 0;

  const handleUrlChange = ({ url }: { url: string }) => {
    if (url.includes("vnp_TransactionStatus=00") || url.includes("Success")) {
      setShowModal(false);
      router.push("/screens/payment-success");
    }
  };

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const { path } = Linking.parse(event.url);
      if (path === "payment-success") {
        router.push("/screens/payment-success");
      }
    };

    // Lắng nghe sự kiện deep link khi ứng dụng đang chạy
    const subscription = Linking.addEventListener("url", handleDeepLink);

    // Kiểm tra deep link khi ứng dụng mở từ trạng thái đóng
    Linking.getInitialURL().then((url) => {
      if (url) {
        const { path } = Linking.parse(url);
        if (path === "payment-success") {
          router.push("/screens/payment-success");
        }
      }
    });

    return () => {
      subscription.remove(); // Dọn dẹp listener
    };
  }, [router]);

  const handleConfirmPayment = async () => {
    if (!selectedMethod) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    try {
      const response = await authService.getDeposit({ UserId: user?.Id || "", Amount: amount });

      if (response) {
        setPaymentUrl(response);
        setShowModal(true);
      } else {
        alert("Không lấy được URL thanh toán!");
      }
    } catch (error) {
      alert("Lỗi khi nạp tiền!");
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
            icon={<ArrowLeft size="24" color="#dff2eb" variant="Outline" />}
            backgroundColor="bg-[#4A628A]"
            onPress={() => router.back()}
          />
          <Text className="text-[20px] text-center font-unbounded">Payment Methods</Text>
        </View>

        {/* Payment Option */}
        <View className="mt-6 space-y-2">
          {/* Cash */}
          <TouchableOpacity
            className={`flex-row items-center justify-between p-3 rounded-[15px] ${
              selectedMethod === "cash" ? "border-blue-500 bg-blue-100" : "bg-[#DFF2EB]"
            }`}
            onPress={() => setSelectedMethod("cash")}
          >
            <View className="flex-row items-center">
              <Money4 size="28" color="#4a628a" variant="Bold" />
              <Text className="text-[14px] font-unbounded-light ml-2">Cash</Text>
            </View>
            <View
              className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === "cash" ? "border-blue-500 bg-blue-500" : "border-gray-300"
              }`}
            />
          </TouchableOpacity>

          {/* Wallet */}
          <Text className="text-[15px] font-unbounded my-4">Wallet</Text>
          <TouchableOpacity
            className={`flex-row items-center justify-between p-3 rounded-[15px] ${
              selectedMethod === "wallet" ? "border-blue-500 bg-blue-100" : "bg-[#DFF2EB]"
            }`}
            onPress={() => setSelectedMethod("wallet")}
          >
            <View className="flex-row items-center space-x-3">
              <EmptyWalletRemove size="28" color="#4a628a" variant="Bold" />
              <Text className="text-[14px] font-unbounded-light ml-2">Wallet</Text>
            </View>
            <View
              className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === "wallet" ? "border-blue-600 bg-blue-600" : "border-gray-300"
              }`}
            />
          </TouchableOpacity>

          {/* Credit & Debit Card */}
          <Text className="text-[15px] font-unbounded my-4">Credit & Debit Card</Text>
          <TouchableOpacity
            className={`flex-row items-center justify-between p-3 rounded-[15px] ${
              selectedMethod === "card" ? "border-blue-500 bg-blue-100" : "bg-[#DFF2EB]"
            }`}
            onPress={() => setSelectedMethod("card")}
          >
            <View className="flex-row items-center space-x-3">
              <CardAdd size="28" color="#4a628a" variant="Bold" />
              <Text className="text-[14px] font-unbounded-light ml-2">Add Card</Text>
            </View>
            <ArrowRight size="24" color="#4a628a" variant="Outline" />
          </TouchableOpacity>

          {/* MoMo */}
          <Text className="text-[15px] font-unbounded my-4">More Payment Options</Text>
          <TouchableOpacity
            className={`flex-row items-center justify-between p-3.5 rounded-[15px] ${
              selectedMethod === "momo" ? "border-blue-500 bg-blue-100" : "bg-[#DFF2EB]"
            }`}
            onPress={() => setSelectedMethod("momo")}
          >
            <View className="flex-row items-center space-x-3">
              <Image source={require("../../../assets/icons/momo.png")} className="w-6 h-6" resizeMode="contain" />
              <Text className="text-[14px] font-unbounded ml-2">Momo</Text>
            </View>
            <View
              className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === "momo" ? "border-blue-500 bg-blue-500" : "border-gray-300"
              }`}
            />
          </TouchableOpacity>

          {/* Payos */}
          <TouchableOpacity
            className={`flex-row items-center justify-between p-3.5 my-4 rounded-[15px] ${
              selectedMethod === "payos" ? "border-blue-500 bg-blue-100" : "bg-[#DFF2EB]"
            }`}
            onPress={() => setSelectedMethod("payos")}
          >
            <View className="flex-row items-center space-x-3">
              <Image source={require("../../../assets/icons/payos.png")} className="w-6 h-6" resizeMode="contain" />
              <Text className="text-[14px] font-unbounded ml-2">Payos</Text>
            </View>
            <View
              className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === "payos" ? "border-blue-500 bg-blue-500" : "border-gray-300"
              }`}
            />
          </TouchableOpacity>

          {/* Apple Pay */}
          <TouchableOpacity
            className={`flex-row items-center justify-between p-3.5 rounded-[15px] ${
              selectedMethod === "applepay" ? "border-blue-500 bg-blue-500" : "bg-[#DFF2EB]"
            }`}
            onPress={() => setSelectedMethod("applepay")}
          >
            <View className="flex-row items-center space-x-3">
              <Image source={require("../../../assets/icons/apple-pay.png")} className="w-6 h-6" resizeMode="contain" />
              <Text className="text-[14px] font-unbounded ml-2">Apple Pay</Text>
            </View>
            <View
              className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === "applepay" ? "border-blue-500 bg-blue-500" : "border-gray-300"
              }`}
            />
          </TouchableOpacity>
        </View>

        {/* Confirm button */}
        <View className="mt-4">
          <Button title="Confirm Payment" backgroundColor="bg-[#48667A]" onPress={handleConfirmPayment} />
        </View>
      </View>

      {/* Modal to display WebView */}
      <Modal visible={showModal} animationType="slide" transparent={false}>
        <View style={{ flex: 1 }}>
          {paymentUrl ? (
            <WebView
              source={{ uri: paymentUrl }}
              style={{ flex: 1 }}
              onNavigationStateChange={handleUrlChange}
              onError={() => alert("Lỗi khi tải trang thanh toán!")}
            />
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default PaymentMethod;
