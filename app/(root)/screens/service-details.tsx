import { Text, View, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { GetRepairServiceById } from "@/services/user.service"; // Import API function
import ActionIcon from "@/components/ActionIcon"; // Import ActionIcon component
import icons from "@/constants/icons"; // Import icons

const ServiceDetail = () => {
  const { id } = useLocalSearchParams(); // Lấy id từ query params
  const router = useRouter(); // Initialize router
  const [service, setService] = useState<any>(null); // State lưu trữ dịch vụ
  const [loading, setLoading] = useState<boolean>(true); // State để kiểm tra trạng thái loading

  useEffect(() => {
    const fetchServiceDetail = async () => {
      setLoading(true); // Bắt đầu trạng thái loading
      try {
        if (id) {
          const data = await GetRepairServiceById(id as string); // Gọi API để lấy dịch vụ
          setService(data); // Lưu dữ liệu vào state
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false); // Kết thúc trạng thái loading
      }
    };

    if (id) {
      fetchServiceDetail(); // Gọi API khi id có giá trị
    }
  }, [id]); // Chạy lại khi id thay đổi

  return (
    <View className="flex-1 bg-[#E5F3F8]">
      {/* Header with back icon */}
      <View className="px-4 pt-4 flex-row justify-between">
        <ActionIcon
          icon={icons.arrowLeft}
          backgroundColor="bg-[#4A628A]"
          tintColor="#DFF2EB"
          onPress={() => router.push("/(root)/screens/all-service")} // Điều hướng khi bấm nút quay lại
        />
      </View>

      {loading ? (
        // Hiển thị loading indicator khi dữ liệu đang được tải
        <ActivityIndicator size="large" color="#4A628A" className="flex-1 justify-center items-center" />
      ) : service ? (
        // Hiển thị thông tin dịch vụ nếu có dữ liệu
        <View className="px-4 mt-4">
          {/* Service Image */}
          <Image
            source={{ uri: service.Image }}
            className="w-full h-[250px] rounded-lg mb-4"
          />

          {/* Service Name */}
          <Text className="font-unbounded text-[22px] font-bold text-[#4A628A]">{service.Name}</Text>

          {/* Category */}
          <View className="mt-2 flex-row items-center">
            <Text className="font-unbounded text-[14px] text-[#6B7C9D]">Category: </Text>
            <Text className="font-unbounded text-[14px] text-[#4A628A]">{service.Category.Name}</Text>
          </View>

          {/* Description */}
          <Text className="font-unbounded text-[16px] text-[#6B7C9D] mt-4">{service.Description}</Text>

          {/* Price */}
          <Text className="font-unbounded text-[18px] text-[#4A628A] mt-4">
            Price: {service.Price.toLocaleString()} VND
          </Text>

          {/* Day Section */}
          <View className="mt-6">
            <Text className="text-2xl font-bold mb-2">Day</Text>
            <View className="flex-row justify-between">
              <TouchableOpacity className="bg-[#A1D8D4] py-2 px-4 rounded-full">
                <Text className="text-white">Today 4 Oct</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-[#A1D8D4] py-2 px-4 rounded-full">
                <Text className="text-white">Mon 6 Oct</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-[#A1D8D4] py-2 px-4 rounded-full">
                <Text className="text-white">Tues 7 Oct</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-[#A1D8D4] py-2 px-4 rounded-full">
                <Text className="text-white">Wed 8 Oct</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Time Section */}
          <View className="mt-6">
            <Text className="text-2xl font-bold mb-2">Time</Text>
            <View className="flex-row justify-between">
              <TouchableOpacity className="bg-[#A1D8D4] py-2 px-4 rounded-full">
                <Text className="text-white">7:00 AM</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-[#A1D8D4] py-2 px-4 rounded-full">
                <Text className="text-white">7:30 AM</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-[#A1D8D4] py-2 px-4 rounded-full">
                <Text className="text-white">8:00 AM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <Text className="text-center mt-4 text-[#6B7C9D]">Không tìm thấy dịch vụ.</Text>
      )}
    </View>
  );
};

export default ServiceDetail;
