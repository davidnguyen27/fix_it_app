import { getService } from "@/services/repairs.service";
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
import { bookingService } from "@/services/bookings.service";
import { getCurrentUser } from "@/services/auth.service";

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
        const user = await getCurrentUser();
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
    generateDates(); // Gọi hàm tạo danh sách ngày
  }, []);

  const fetchServiceDetails = async () => {
    try {
      const serviceData = await getService(id as string);
      setService(serviceData);
    } catch (error) {
      console.error("Failed to fetch service details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm định dạng ngày thành "Thứ, Ngày Tháng"
  const formatDate = (date: Date): string => {
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];

    // Nếu là ngày hôm nay, thêm "Today" ở trên
    return isToday ? `Today\n${day} ${month}` : `${day} ${month}`;
  };

  // Hàm tạo danh sách ngày 7 ngày tới
  const generateDates = () => {
    const today = new Date();
    const generatedDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i); // Tăng dần số ngày
      generatedDates.push(formatDate(date));
    }
    setDates(generatedDates);
  };

  const formatDateToYYYYMMDD = (dateString: string): string => {
    const today = new Date();
    const months = {
      JAN: "01",
      FEB: "02",
      MAR: "03",
      APR: "04",
      MAY: "05",
      JUN: "06",
      JUL: "07",
      AUG: "08",
      SEP: "09",
      OCT: "10",
      NOV: "11",
      DEC: "12",
    };

    // Xử lý "Today" nếu có
    let formattedDate = dateString.replace("Today\n", "");
    const [day, month] = formattedDate.split(" ");

    // Chuyển về yyyy-mm-dd
    return `${today.getFullYear()}-${months[month]}-${day.padStart(2, "0")}`;
  };

  const formatTimeToHHMMSS = (timeString: string): string => {
    let [time, period] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
  };

  const handleBooking = async () => {
    console.log("🟢 selectedDate:", selectedDate);
    console.log("🟢 selectedTime:", selectedTime);
    console.log("🟢 address:", address);
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

    try {
      const data = await bookingService(bookingData);
      console.log("Data booking: ", data.data);
      alert("✅ Đặt lịch thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi đặt lịch:", error);
      alert("Đặt lịch thất bại, vui lòng thử lại!");
    }
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
    <View>
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
      <View className="bg-white h-full rounded-t-[46px] mt-[-20px] p-6">
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
        <View className="flex-row space-x-3 mb-4">
          {dates.map((day, index) => (
            <TouchableOpacity
              key={index}
              className={`px-4 py-2 rounded-[25px] h-auto ${
                selectedDate === day ? "bg-[#4A628A]" : "bg-[#B9E5E8]"
              }`}
              onPress={() => setSelectedDate(day)}
            >
              <Text
                className={`text-[15px] font-unbounded-medium text-center whitespace-pre ${
                  selectedDate === day ? "text-white" : "text-black"
                }`}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Time Selection */}
        <Text className="text-[40px] font-unbounded mb-2">Time</Text>
        <View className="flex-row space-x-2 mb-4">
          {["7:00 AM", "7:30 AM", "8:00 AM"].map((time, index) => (
            <TouchableOpacity
              key={index}
              className={`px-4 py-2 rounded-lg ${
                selectedTime === time ? "bg-[#4A628A]" : "bg-[#B9E5E8]"
              }`}
              onPress={() => setSelectedTime(time)}
            >
              <Text className={`${selectedTime === time ? "text-white" : "text-black"}`}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Address Input */}
        <Text className="text-[13px] font-unbounded mb-2">Your address</Text>
        <TextInput
          placeholder="Enter here"
          className="border border-gray-300 bg-[#B9E5E8] rounded-[15px] h-[76px] p-2 mb-6"
          multiline
          value={address} // Gán giá trị từ state
          onChangeText={(text) => setAddress(text)} // Cập nhật state khi nhập
        />

        {/* Continue Button */}
        <TouchableOpacity onPress={handleBooking} className="bg-[#4A628A] py-4 rounded-full">
          <Text className="text-white text-center text-lg font-bold">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceDetail;
