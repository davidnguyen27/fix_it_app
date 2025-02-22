import { repairService } from "@/services/repairs.service";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import icons from "@/constants/icons";
import ActionIcon from "@/components/ActionIcon";
import { authService } from "@/services/auth.service";
import { formatDateToYYYYMMDD, formatTimeToHHMMSS, generateDates } from "@/utils/DateFormat";

interface ServiceDetail {
  Id: string;
  Name: string;
  Image: string;
  Price: number;
  Description: string;
  Category: {
    Name: string;
  };
}

const ServiceDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [dates, setDates] = useState<string[]>([]);
  const [address, setAddress] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        console.log("CustomerId: ", user?.Id);
        setCustomerId(user?.Id); // Lưu CustomerId của user hiện tại
      } catch (error) {
        console.error("❌ Lỗi lấy thông tin user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (id) {
      fetchServiceDetails();
    }
  }, [id]);

  useEffect(() => {
    setDates(generateDates()); // Gọi hàm tạo danh sách ngày
  }, []);

  const fetchServiceDetails = async () => {
    try {
      const serviceData = await repairService.getService(id as string);
      setService(serviceData);
    } catch (error) {
      console.error("Failed to fetch service details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !address) {
      alert("Vui lòng chọn ngày, giờ và nhập địa chỉ!");
      return;
    }

    const formattedDate = formatDateToYYYYMMDD(selectedDate);
    const formattedTime = formatTimeToHHMMSS(selectedTime);

    const bookingData = {
      CustomerId: customerId,
      ServiceId: service?.Id,
      WorkingDate: formattedDate,
      Address: address,
      WorkingTime: formattedTime,
    };

    router.push({
      pathname: "/screens/payment-method",
      params: bookingData, // Truyền dữ liệu booking qua màn hình PaymentMethod
    });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4A628A" />
      </View>
    );
  }

  if (!service) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Service not found!</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="relative bg-[#5e99a9] pb-8">
        <View className="absolute top-0 left-0 right-0 flex-row justify-between items-center p-4 z-10">
          <ActionIcon
            icon={icons.arrowLeft}
            backgroundColor="bg-[#DFF2EB]"
            tintColor="#4A628A"
            onPress={() => router.push("/explore")}
          />
          <View className="flex-row gap-4">
            <ActionIcon
              icon={require("../../../../assets/icons/share.png")}
              backgroundColor="bg-[#DFF2EB]"
              tintColor="#4A628A"
              onPress={() => console.log("Share")}
            />
            <ActionIcon
              icon={require("../../../../assets/icons/heart.png")}
              backgroundColor="bg-[#DFF2EB]"
              tintColor="#4A628A"
              onPress={() => console.log("Heart")}
            />
          </View>
        </View>

        {/* Service Image */}
        <View className="w-full items-center mt-16">
          <Image
            source={{ uri: service.Image }}
            className="w-[70%] h-60 rounded-lg object-contain"
            style={{ backgroundColor: "#ffffff" }}
          />
        </View>
      </View>

      {/* Content */}
      <View className="bg-white h-full rounded-t-[46px] mt-[-50px] p-6">
        {/* Category */}
        <Text className="text-[14px] font-unbounded-light bg-[#B9E5E8] px-2 py-1 rounded-[9px] self-start mb-2 ml-4">
          {service.Category.Name}
        </Text>

        {/* Service Name */}
        <Text className="text-[24px] font-unbounded mb-2">{service.Name}</Text>
        <Text className="text-[14px] font-unbounded-light mb-4">HCM, Viet Nam</Text>

        {/* Booking Section */}
        <Text className="text-[15px] font-unbounded mb-2">BOOK APPOINTMENT</Text>

        {/* Date Selection */}
        <Text className="text-[40px] font-unbounded mb-2">Day</Text>
        <View className="flex-row flex-wrap gap-2 mb-4">
          {dates.map((day, index) => (
            <TouchableOpacity
              key={index}
              className={`px-4 py-2 rounded-full bg-[#B9E5E8] min-w-[80px] items-center`}
              onPress={() => setSelectedDate(day)}
            >
              <Text className="text-[12px] text-center text-gray-700">
                {index === 0 ? "Today" : day.split(" ")[0]}
              </Text>
              <Text className="text-[16px] font-bold text-center text-black">
                {day.split(" ")[1]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Time Selection */}
        <Text className="text-[40px] font-unbounded mb-2">Time</Text>
        <View className="flex-row flex-wrap gap-2 mb-4">
          {["9:00 AM", "10:00 AM", "11:00 AM", "14:00 PM", "15:00 PM", "16:00 PM", "17:00 PM"].map(
            (time, index) => (
              <TouchableOpacity
                key={index}
                className={`px-4 py-2 rounded-full bg-[#B9E5E8] min-w-[80px] items-center`}
                onPress={() => setSelectedTime(time)}
              >
                <Text className="text-[15px] font-unbounded-light">{time.split(" ")[0]}</Text>
                <Text className="text-[15px] font-unbounded-medium">{time.split(" ")[1]}</Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* Address Input */}
        <Text className="text-[13px] font-unbounded mb-2">Your address</Text>
        <TextInput
          placeholder="Enter here"
          className="bg-[#B9E5E8] rounded-[15px] p-4 mb-6"
          value={address} // Gán giá trị từ state
          onChangeText={(text) => setAddress(text)} // Cập nhật state khi nhập
        />

        {/* Continue Button */}
        <TouchableOpacity onPress={handleBooking} className="bg-[#4A628A] py-4 rounded-full">
          <Text className="text-white text-center text-lg font-bold">Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ServiceDetail;
