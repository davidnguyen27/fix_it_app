import {
  View,
  Text,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import ActionIcon from "@/components/ActionIcon";
import icons from "@/constants/icons";
import Button from "@/components/Button";

const ProfileDetail = () => {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<string | undefined>("Select");
  const [isGenderPickerVisible, setIsGenderPickerVisible] = useState(false);

  return (
    <ImageBackground
      source={require("../../../assets/images/bg-signup.png")}
      resizeMode="cover"
      className="flex-1"
    >
      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <View className="mt-8">
          <ActionIcon
            icon={icons.arrowLeft}
            backgroundColor="bg-[#4A628A]"
            tintColor="#DFF2EB"
            onPress={() => router.push("/(root)/(tabs)/profile")}
          />
          <Text className="text-[20px] text-center font-unbounded">Your profile</Text>
        </View>

        {/* Avatar */}
        <View className="items-center mt-5 mb-6">
          <View className="relative">
            <Image className="size-[150px] bg-[#B9E5E8] rounded-full" />
            <TouchableOpacity className="absolute bottom-0 right-2 size-[35px] bg-[#4A628A] rounded-full border-2 border-[#97C9E3] flex items-center justify-center">
              <Image source={icons.pencil} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Name */}
        <View className="mt-8">
          <Text className="text-[14px] font-unbounded mb-3">Name</Text>
          <TextInput
            className="bg-[#DFF2EB] rounded-2xl px-4 py-4 font-unbounded-light"
            placeholder="Enter your name"
            placeholderTextColor="#A9A9A9"
            maxLength={50}
            textAlignVertical="center"
            numberOfLines={1}
            defaultValue="Esther Howard"
          />
        </View>

        {/* Phone Number */}
        <View className="mt-8">
          <Text className="text-[14px] font-unbounded mb-3">Phone Number</Text>
          <View className="bg-[#DFF2EB] rounded-2xl flex-row items-center px-4 py-1 justify-between">
            <TextInput
              className="flex-1 font-unbounded-light"
              placeholder="Enter your phone number"
              placeholderTextColor="#A9A9A9"
              keyboardType="phone-pad"
              defaultValue="0123 456 7891"
              numberOfLines={1}
            />
            <TouchableOpacity>
              <Text className="font-unbounded-light text-[14px]">Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Email */}
        <View className="mt-8">
          <Text className="text-[14px] font-unbounded mb-3">Email</Text>
          <TextInput
            className="bg-[#DFF2EB] rounded-2xl px-4 py-4 font-unbounded-light"
            placeholder="Enter your email"
            placeholderTextColor="#A9A9A9"
            keyboardType="email-address"
            defaultValue="Example@gmail.com"
          />
        </View>

        {/* Gender */}
        <View className="mt-8 relative">
          <Text className="text-[14px] font-unbounded mb-3">Gender</Text>
          <TouchableOpacity
            className="bg-[#DFF2EB] rounded-2xl px-4 py-4 flex-row justify-between items-center"
            onPress={() => setIsGenderPickerVisible(!isGenderPickerVisible)}
          >
            <Text className="font-unbounded-light">{selectedGender}</Text>
            <Image source={icons.arrowDown} className="size-4" />
          </TouchableOpacity>
          {isGenderPickerVisible && (
            <View className="absolute top-[80px] left-0 right-0 bg-[#DFF2EB] shadow-lg rounded-2xl z-10 border border-gray-300">
              <TouchableOpacity
                onPress={() => {
                  setSelectedGender("Male");
                  setIsGenderPickerVisible(false);
                }}
                className="p-4 border-b border-gray-200"
              >
                <Text className="text-center">Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedGender("Female");
                  setIsGenderPickerVisible(false);
                }}
                className="p-4"
              >
                <Text className="text-center">Female</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Continue button */}
        <View className="mt-8">
          <Button
            title="Continue"
            backgroundColor="bg-[#4A628A]"
            onPress={() => console.log("Continue Pressed")}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ProfileDetail;
