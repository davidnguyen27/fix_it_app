import Button from "@/components/Button";
import ActionIcon from "@/components/ActionIcon";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TextInput, ImageBackground, ScrollView, ActivityIndicator } from "react-native";
import useUser from "@/hooks/useUser";
import useBooking from "@/hooks/useBooking";
import { formatCurrencyVND } from "@/utils/CurrencyFormat";
import Toast from "react-native-toast-message";
import { ArrowLeft } from "iconsax-react-native";

const ConfirmBooking = () => {
  const router = useRouter();
  const { user } = useUser();
  const { createBooking, isLoading } = useBooking();
  const params = useLocalSearchParams();
  const ServiceName = Array.isArray(params.ServiceName) ? params.ServiceName.join("") : params.ServiceName || "";
  const Address = Array.isArray(params.Address) ? params.Address.join("") : params.Address || "";
  const WorkingDate = Array.isArray(params.WorkingDate) ? params.WorkingDate.join("") : params.WorkingDate || "";
  const WorkingTime = Array.isArray(params.WorkingTime) ? params.WorkingTime.join("") : params.WorkingTime || "";
  const ServiceId = Array.isArray(params.ServiceId) ? params.ServiceId.join("") : params.ServiceId || "";
  const Note = Array.isArray(params.Note) ? params.Note.join("") : params.Note || "";

  const handleBooking = async () => {
    const bookingData = {
      CustomerId: user?.Id || "",
      ServiceId,
      WorkingDate,
      Address,
      WorkingTime,
      Note,
    };

    await createBooking(bookingData);

    Toast.show({
      type: "success",
      text1: "Notification",
      text2: "Booking successfully!",
    });
    router.push("/");
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/bg-signup.png")}
      resizeMode="cover"
      className="flex-1 justify-center"
    >
      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <View className="mt-8">
          <ActionIcon
            icon={<ArrowLeft size="24" color="#DFF2EB" variant="Outline" />}
            backgroundColor="bg-[#4A628A]"
            onPress={() => router.push("/(root)/(tabs)")}
          />
          <Text className="text-[20px] text-center font-unbounded">Confirm Booking</Text>
        </View>

        <Text className="text-[14px] font-unbounded-light text-center mt-4">Check your information's booking</Text>

        <View className="mt-8 w-full">
          <Text className="text-[14px] font-unbounded-light mb-3">Service Name</Text>
          <TextInput
            className="bg-[#DFF2EB] rounded-2xl px-4 py-4 font-unbounded-light"
            placeholder="Enter your username"
            placeholderTextColor="#A9A9A9"
            maxLength={50}
            textAlignVertical="center"
            numberOfLines={1}
            value={ServiceName}
          />
        </View>

        {/* Input Username */}
        <View className="mt-8 w-full">
          <Text className="text-[14px] font-unbounded-light mb-3">Full Name</Text>
          <TextInput
            className="bg-[#DFF2EB] rounded-2xl px-4 py-4 font-unbounded-light"
            placeholder="Enter your username"
            placeholderTextColor="#A9A9A9"
            maxLength={50}
            textAlignVertical="center"
            numberOfLines={1}
            value={user?.Fullname}
          />
        </View>

        {/* Input Password */}
        <View className="mt-8 w-full">
          <Text className="text-[14px] font-unbounded-light mb-3">Email</Text>
          <View className="flex-row items-center bg-[#DFF2EB] rounded-2xl px-4">
            <TextInput
              className="flex-1 font-unbounded-light py-4"
              placeholder="Enter your password"
              placeholderTextColor="#A9A9A9"
              textAlignVertical="center"
              numberOfLines={1}
              value={user?.Email}
            />
          </View>
        </View>

        <View className="mt-8 w-full">
          <Text className="text-[14px] font-unbounded-light mb-3">Address</Text>
          <View className="flex-row items-center bg-[#DFF2EB] rounded-2xl px-4">
            <TextInput
              className="flex-1 font-unbounded-light py-4"
              placeholder="Enter your password"
              placeholderTextColor="#A9A9A9"
              textAlignVertical="center"
              numberOfLines={1}
              value={Address}
            />
          </View>
        </View>

        <View className="mt-8 w-full">
          <Text className="text-[14px] font-unbounded-light mb-3">Working Date</Text>
          <View className="flex-row items-center bg-[#DFF2EB] rounded-2xl px-4">
            <TextInput
              className="flex-1 font-unbounded-light py-4"
              textAlignVertical="center"
              numberOfLines={1}
              value={WorkingDate}
            />
          </View>
        </View>

        <View className="mt-8 w-full">
          <Text className="text-[14px] font-unbounded-light mb-3">Working Time</Text>
          <View className="flex-row items-center bg-[#DFF2EB] rounded-2xl px-4">
            <TextInput
              className="flex-1 font-unbounded-light py-4"
              textAlignVertical="center"
              numberOfLines={1}
              value={WorkingTime}
            />
          </View>
        </View>

        <View className="mt-8 w-full">
          <Text className="text-[14px] font-unbounded-light mb-3">Note</Text>
          <View className="flex-row items-center bg-[#DFF2EB] rounded-2xl px-4">
            <TextInput
              className="flex-1 font-unbounded-light py-4"
              textAlignVertical="center"
              numberOfLines={2}
              value={Note}
            />
          </View>
        </View>

        <View className="mt-8 w-full">
          <Text className="text-[14px] font-unbounded-light mb-3">Balance</Text>
          <View className="flex-row items-center bg-[#DFF2EB] rounded-2xl px-4">
            <TextInput
              className="flex-1 font-unbounded-light py-4"
              placeholder="Enter your password"
              placeholderTextColor="#A9A9A9"
              textAlignVertical="center"
              numberOfLines={1}
              value={formatCurrencyVND(user?.Balance).toString()}
            />
          </View>
        </View>

        {/* Booking button */}
        <View className="mt-8">
          {isLoading ? (
            <ActivityIndicator size="large" color="#4A628A" />
          ) : (
            <Button title="Booking" backgroundColor="bg-[#4A628A]" onPress={handleBooking} />
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ConfirmBooking;
