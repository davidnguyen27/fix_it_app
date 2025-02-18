import { Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, TextInput } from "react-native";
import { useRouter } from "expo-router";
import icons from "@/constants/icons";
import ActionIcon from "@/components/ActionIcon";
import { useEffect, useState } from "react";
import { GetAllRepairServices } from "@/services/user.service"; // Cập nhật đúng đường dẫn đến API

// Định nghĩa kiểu dữ liệu cho dịch vụ
interface Service {
  Id: string;
  Name: string;
  WorkerName: string;
  Price: number;
  Description: string;
  Image: string;
}

const ServiceDetails = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredServices, setFilteredServices] = useState<Service[]>([]); 

  // Lấy danh sách dịch vụ khi trang được tải
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const data = await GetAllRepairServices({
          PageNumber: 1,
          PageSize: 20,
        });
        setFilteredServices(data.Data); 
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Hàm tìm kiếm dịch vụ từ API
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setLoading(true); 

    try {
      const data = await GetAllRepairServices({
        PageNumber: 1,
        PageSize: 20,
        SearchName: query, 
      });
      setFilteredServices(data.Data); 
    } catch (error) {
      console.error("Error searching services:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <View className="flex-1 bg-[#E5F3F8]">
      {/* Header */}
      <View className="px-4 pt-4 flex-row justify-between">
        <ActionIcon
          icon={icons.arrowLeft}
          backgroundColor="bg-[#4A628A]"
          tintColor="#DFF2EB"
          onPress={() => router.push("/(root)/(tabs)")}
        />
      </View>

      {/* Search Input */}
      <View className="px-4 mt-4">
        <TextInput
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Tìm dịch vụ..."
          className="bg-white p-3 rounded-lg shadow-md text-[#4A628A] font-unbounded"
        />
      </View>

      {/* Service List */}
      {loading ? (
        // Hiển thị loading indicator khi đang tải dữ liệu
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4A628A" />
        </View>
      ) : (
        <ScrollView className="px-4 mt-4">
          {filteredServices.map((service, index) => (
            <View key={index} className="bg-white p-4 mb-4 rounded-lg shadow-md">
              {/* Image */}
              <Image
                source={{ uri: service.Image }} // Lấy ảnh từ URL
                className="w-full h-[200px] rounded-lg"
              />
              
              {/* Service Name */}
              <Text className="font-unbounded text-[18px] font-bold text-[#4A628A] mt-4">
                {service.Name}
              </Text>
              
              {/* Description */}
              <Text className="font-unbounded text-[14px] mt-2 text-[#6B7C9D]">
                {service.Description}
              </Text>

              {/* Price */}
              <Text className="font-unbounded text-[16px] mt-2 text-[#4A628A]">
                {service.Price.toLocaleString()} VND
              </Text>

              {/* View Details Button */}
              <TouchableOpacity
                className="mt-4 bg-[#4A628A] p-2 rounded-lg"
                onPress={() => router.push(`/(root)/screens/service-details?id=${service.Id}`)} 
              >
                <Text className="text-white text-center">View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ServiceDetails;
