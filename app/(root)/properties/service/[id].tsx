import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, TextInput, TouchableOpacity } from "react-native";
import ActionIcon from "@/components/ActionIcon";
import { formatDateToYYYYMMDD, formatTimeToHHMMSS, generateDates } from "@/utils/DateFormat";
import { isTimeDisabled, timeSlots } from "@/utils/TimeUtil"; // Import từ file util
import useUser from "@/hooks/useUser";
import useRepairService from "@/hooks/useService";
import Button from "@/components/Button";
import { ArrowLeft, Heart } from "iconsax-react-native";
import Entypo from "@expo/vector-icons/Entypo";

const ServiceDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useUser();
  const { service, getService, isLoading } = useRepairService();

  const [dates, setDates] = useState<string[]>([]);
  const [address, setAddress] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    getService(id);
  }, [id]);

  useEffect(() => {
    setDates(generateDates());
  }, []);

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !address) {
      alert("Vui lòng chọn ngày, giờ và nhập địa chỉ!");
      return;
    }

    const formattedDate = formatDateToYYYYMMDD(selectedDate);
    const formattedTime = formatTimeToHHMMSS(selectedTime);

    const bookingData = {
      CustomerId: user?.Id,
      ServiceId: service?.Id,
      ServiceName: service?.Name,
      WorkingDate: formattedDate,
      Address: address,
      WorkingTime: formattedTime,
      Note: note,
    };

    router.push({
      pathname: "/screens/confirm-booking",
      params: bookingData,
    });
  };

  if (isLoading) {
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

  const isTodaySelected = selectedDate === dates[0];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="relative bg-[#5e99a9] pb-8">
        <View className="absolute top-0 left-0 right-0 flex-row justify-between items-center p-4 z-10">
          <ActionIcon
            icon={<ArrowLeft size="24" color="#4A628A" variant="Outline" />}
            backgroundColor="bg-[#DFF2EB]"
            onPress={() => router.push("/explore")}
          />
          <View className="flex-row gap-4">
            <ActionIcon
              icon={<Entypo name="share" size={24} color="#4A628A" />}
              backgroundColor="bg-[#DFF2EB]"
              onPress={() => console.log("Share")}
            />
            <ActionIcon
              icon={<Heart size="24" color="#4a628a" variant="Bold" />}
              backgroundColor="bg-[#DFF2EB]"
              onPress={() => console.log("Heart")}
            />
          </View>
        </View>

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
        <Text className="text-[14px] font-unbounded-light bg-[#B9E5E8] px-2 py-1 rounded-[9px] self-start mb-2 ml-4">
          {service.Category.Name}
        </Text>

        <Text className="text-[24px] font-unbounded mb-2">{service.Name}</Text>
        <Text className="text-[14px] font-unbounded-light mb-4">HCM, Viet Nam</Text>

        <Text className="text-[15px] font-unbounded mb-2">BOOK APPOINTMENT</Text>

        {/* Date Selection */}
        <Text className="text-[40px] font-unbounded mb-2">Day</Text>
        <View className="flex-row flex-wrap gap-2 mb-4">
          {dates.map((day, index) => (
            <TouchableOpacity
              key={index}
              className={`px-4 py-2 rounded-full min-w-[80px] items-center ${
                selectedDate === day ? "bg-[#4A628A]" : "bg-[#B9E5E8]"
              }`}
              onPress={() => {
                setSelectedDate(day);
                setSelectedTime(null); // Reset time khi đổi ngày
              }}
            >
              <Text className={`text-[12px] text-center ${selectedDate === day ? "text-white" : "text-gray-700"}`}>
                {index === 0 ? "Today" : day.split(" ")[0]}
              </Text>
              <Text
                className={`text-[16px] font-bold text-center ${selectedDate === day ? "text-white" : "text-black"}`}
              >
                {day.split(" ")[1]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Time Selection */}
        <Text className="text-[40px] font-unbounded mb-2">Time</Text>
        <View className="flex-row flex-wrap gap-2 mb-4">
          {timeSlots.map((time, index) => {
            const disabled = isTimeDisabled(time, isTodaySelected);
            return (
              <TouchableOpacity
                key={index}
                className={`px-4 py-2 rounded-full min-w-[80px] items-center ${
                  disabled ? "bg-gray-300" : selectedTime === time ? "bg-[#4A628A]" : "bg-[#B9E5E8]"
                }`}
                onPress={() => !disabled && setSelectedTime(time)}
                disabled={disabled}
              >
                <Text
                  className={`text-[15px] font-unbounded-light ${
                    disabled ? "text-gray-500" : selectedTime === time ? "text-white" : "text-black"
                  }`}
                >
                  {time.split(" ")[0]}
                </Text>
                <Text
                  className={`text-[15px] font-unbounded-medium ${
                    disabled ? "text-gray-500" : selectedTime === time ? "text-white" : "text-black"
                  }`}
                >
                  {time.split(" ")[1]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Address Input */}
        <Text className="text-[13px] font-unbounded mb-2">Your address</Text>
        <TextInput
          placeholder="Enter here"
          className="bg-[#B9E5E8] rounded-[15px] p-4 mb-6"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        {/* Note Input */}
        <Text className="text-[13px] font-unbounded mb-2">Note</Text>
        <TextInput
          placeholder="Enter here"
          className="bg-[#B9E5E8] rounded-[15px] p-4 mb-6"
          value={note}
          onChangeText={(text) => setNote(text)}
        />

        <Button title="Booking" backgroundColor="bg-[#4A628A]" onPress={handleBooking} />
      </View>
    </ScrollView>
  );
};

export default ServiceDetail;
