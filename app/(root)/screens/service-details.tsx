import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const ServiceDetail = () => {
  const { id } = useLocalSearchParams(); // Lấy id từ query params

  return (
    <View className="flex-1 bg-[#E5F3F8]">
      {/* Chỉ hiển thị id */}
      <Text className="text-center mt-4 text-[#6B7C9D]">Dịch vụ ID: {id}</Text>
    </View>
  );
};

export default ServiceDetail;
