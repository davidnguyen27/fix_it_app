import {
  View,
  Text,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import ActionIcon from "@/components/ActionIcon";
import Button from "@/components/Button";
import { useGlobalContext } from "@/context/GlobalProvider";
import useUser from "@/hooks/useUser";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/config/firebase";
import { ArrowDown2, ArrowLeft, Edit2 } from "iconsax-react-native";

const ProfileDetail = () => {
  const router = useRouter();
  const { user, setUser } = useGlobalContext();
  const { update, refetchUser, isLoading } = useUser();

  const [isGenderPickerVisible, setIsGenderPickerVisible] = useState(false);

  const handleInputChange = (field: keyof User, value: string) => {
    if (user) {
      setUser({ ...user, [field]: value });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      handleInputChange("Avatar", result.assets[0].uri); // Hiển thị tạm thời ảnh chọn
      await uploadImageToFirebase(result.assets[0].uri); // Upload lên Firebase
    }
  };

  const uploadImageToFirebase = async (imageUri: string) => {
    if (!imageUri) return;

    const response = await fetch(imageUri);
    const blob = await response.blob();
    const filename = `avatars/${user?.Id}_${Date.now()}.jpg`;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Có thể hiển thị progress nếu cần
        },
        (error) => {
          console.error("Upload failed", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          handleInputChange("Avatar", downloadURL); // Cập nhật URL vào user
          resolve(downloadURL);
        }
      );
    });
  };

  const handleUpdate = async () => {
    update();
    refetchUser();
  };

  return (
    <ImageBackground source={require("../../../../assets/images/bg-signup.png")} resizeMode="cover" className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
        {/* Header */}
        <View className="mt-8">
          <ActionIcon
            icon={<ArrowLeft size="28" color="#dff2eb" variant="Outline" />}
            backgroundColor="bg-[#4A628A]"
            onPress={() => router.push("/(root)/(tabs)/profile")}
          />
          <Text className="text-[20px] text-center font-unbounded">Your profile</Text>
        </View>

        {/* Avatar */}
        <View className="items-center mt-5 mb-6">
          <View className="relative">
            <Image source={{ uri: user?.Avatar }} className="size-[150px] bg-[#B9E5E8] rounded-full" />
            <TouchableOpacity
              className="absolute bottom-0 right-2 size-[35px] bg-[#4A628A] rounded-full border-2 border-[#97C9E3] flex items-center justify-center"
              onPress={pickImage}
            >
              <Edit2 size="16" color="#dff2eb" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Fullname */}
        <View className="mt-8">
          <Text className="text-[14px] font-unbounded mb-3">Full Name</Text>
          <TextInput
            className="bg-[#DFF2EB] rounded-2xl px-4 py-4 font-unbounded-light"
            placeholder="Enter your Fullname"
            placeholderTextColor="#A9A9A9"
            maxLength={50}
            textAlignVertical="center"
            numberOfLines={1}
            defaultValue={user?.Fullname}
            onChangeText={(text) => handleInputChange("Fullname", text)}
          />
        </View>

        {/* Input Username */}
        <View className="mt-8">
          <Text className="text-[14px] font-unbounded mb-3">Username</Text>
          <TextInput
            className="bg-[#DFF2EB] rounded-2xl px-4 py-4 font-unbounded-light"
            placeholder="Enter your Username"
            placeholderTextColor="#A9A9A9"
            maxLength={50}
            textAlignVertical="center"
            numberOfLines={1}
            defaultValue={user?.UserName}
            onChangeText={(text) => handleInputChange("UserName", text)}
          />
        </View>

        {/* Input Address */}
        <View className="mt-8">
          <Text className="text-[14px] font-unbounded mb-3">Address</Text>
          <TextInput
            className="bg-[#DFF2EB] rounded-2xl px-4 py-4 font-unbounded-light"
            placeholder="Enter your Address"
            placeholderTextColor="#A9A9A9"
            maxLength={50}
            textAlignVertical="center"
            numberOfLines={1}
            defaultValue={user?.Address}
            onChangeText={(text) => handleInputChange("Address", text)}
          />
        </View>

        {/* Email */}
        <View className="mt-8">
          <Text className="text-[14px] font-unbounded mb-3">Email</Text>
          <TextInput
            className="bg-[#DFF2EB] rounded-2xl px-4 py-4 font-unbounded-light"
            placeholder="Enter your email"
            placeholderTextColor="#A9A9A9"
            keyboardType="email-address"
            defaultValue={user?.Email}
            onChangeText={(text) => handleInputChange("Email", text)}
          />
        </View>

        {/* Gender */}
        <View className="mt-8 relative">
          <Text className="text-[14px] font-unbounded mb-3">Gender</Text>
          <TouchableOpacity
            className="bg-[#DFF2EB] rounded-2xl px-4 py-4 flex-row justify-between items-center"
            onPress={() => setIsGenderPickerVisible(!isGenderPickerVisible)}
          >
            <Text className="font-unbounded-light">{user?.Gender || "Select"} </Text>
            <ArrowDown2 size="16" color="#000000" />
          </TouchableOpacity>
          {isGenderPickerVisible && (
            <View className="absolute top-[80px] left-0 right-0 bg-[#DFF2EB] shadow-lg rounded-2xl z-10 border border-gray-300">
              {["Male", "Female", "Other"].map((gender) => (
                <TouchableOpacity
                  key={gender}
                  onPress={() => {
                    handleInputChange("Gender", gender);
                    setIsGenderPickerVisible(false);
                  }}
                  className="p-4 border-b border-gray-200"
                >
                  <Text className="text-center">{gender}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Continue button */}
        <View className="mt-2">
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Button title="Update" backgroundColor="bg-[#4A628A]" onPress={handleUpdate} />
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ProfileDetail;
