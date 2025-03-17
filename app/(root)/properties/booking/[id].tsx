import ActionIcon from "@/components/ActionIcon";
import Button from "@/components/Button";
import useUser from "@/hooks/useUser";
import useBooking from "@/hooks/useBooking";
import { ArrowLeft, User } from "iconsax-react-native";
import { View, Text, Image, ImageBackground } from "react-native";
import { formatCurrencyVND } from "@/utils/CurrencyFormat";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";

const BookingDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams() as { id: string };
  const { user } = useUser() as { user: User | null };
  const { bookingDetail, fetchBookingDetail } = useBooking();

  // Gọi API để lấy thông tin chi tiết booking
  useEffect(() => {
    if (id) fetchBookingDetail(id);
  }, [id]);

  const handleContinue = () => {
    console.log("Continue pressed for booking:", id);
    router.push(`/screens/review?id=${id}`);
  };

  return (
    <ImageBackground
      source={require("../../../../assets/images/background2.png")}
      resizeMode="cover"
      className="flex-1 px-6 py-6"
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <ActionIcon
          icon={<ArrowLeft size="24" color="#dff2eb" variant="Outline" />}
          backgroundColor="bg-[#4A628A]"
          onPress={() => router.back()}
        />
        <Text className="text-[20px] font-unbounded-bold text-center flex-1">Review Summary</Text>
      </View>

      <View className="size-10" />

      {/* Service Info */}
      <View className="flex-row items-center mb-4 bg-white p-4 rounded-[15px] shadow-lg">
        <Image source={{ uri: bookingDetail?.Service.Image }} className="w-24 h-24 mr-4" resizeMode="contain" />
        <View>
          <Text className="text-[14px] font-unbounded-medium text-[#4A628A] mb-1">
            {bookingDetail?.Service.Category.Name}
          </Text>
          <Text className="text-[16px] font-unbounded-bold">{bookingDetail?.Service.Name}</Text>
          <View className="flex-row items-center mt-1">
            <User size="20" color="#4a628a" variant="Bold" />
            <Text className="text-[14px] font-unbounded-medium ml-1">Worker Name</Text>
          </View>
          <Text className="text-[16px] font-unbounded-bold mt-1">
            {formatCurrencyVND(bookingDetail?.Service.Price)} VND
          </Text>
        </View>
      </View>

      {/* Details */}
      <View className="bg-white p-4 rounded-[15px] shadow-lg mb-4">
        <View className="mb-2">
          <Text className="text-[12px] font-unbounded-medium text-gray-500">Booking Day</Text>
          <Text className="text-[14px] font-unbounded-medium">
            {new Date(bookingDetail?.WorkingDate || "").toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            | {bookingDetail?.WorkingTime}
          </Text>
        </View>
        <View className="mb-2">
          <Text className="text-[12px] font-unbounded-medium text-gray-500">Customer</Text>
          <Text className="text-[14px] font-unbounded-medium">{user?.Fullname || ""}</Text>
        </View>
        <View className="mb-2">
          <Text className="text-[12px] font-unbounded-medium text-gray-500">Amount</Text>
          <Text className="text-[14px] font-unbounded-medium">
            {formatCurrencyVND(bookingDetail?.Service.Price)} VND
          </Text>
        </View>
        <View className="border-t border-gray-300 pt-2">
          <Text className="text-[14px] font-unbounded-bold">Total</Text>
          <Text className="text-[16px] font-unbounded-bold">{formatCurrencyVND(bookingDetail?.Service.Price)} VND</Text>
        </View>
      </View>

      {/* Rating Button */}
      <Button backgroundColor="bg-[#3E586A]" onPress={handleContinue} title="Continue" />
    </ImageBackground>
  );
};

export default BookingDetail;
