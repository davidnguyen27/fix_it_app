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
import { useEffect, useState } from "react";
import ActionIcon from "@/components/ActionIcon";
import icons from "@/constants/icons";
import Button from "@/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentUser } from "@/services/auth.service";
import { updateUser } from "@/services/user.service";

const ProfileDetail = () => {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<string | undefined>("Select");
  const [isGenderPickerVisible, setIsGenderPickerVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(true);

  const handleUpdate = async () => {
    if (!user) return;

    const updatedUser = {
      Fullname: user.Fullname,
      UserName: user.UserName,
      Address: user.Address,
      Email: user.Email,
      Gender: user.Gender,
    };

    try {
      const response = await updateUser(user.Id, updatedUser);
      console.log("User updated successfully:", response);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  useEffect(() => {
    const checkTokenAndFetchUser = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("AccessToken");
        if (!accessToken) {
          setIsSignedIn(false);
          return;
        }

        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        setIsSignedIn(false);
      }
    };

    checkTokenAndFetchUser();
  }, []);

  return (
    <ImageBackground
      source={require("../../../../assets/images/bg-signup.png")}
      resizeMode="cover"
      className="flex-1"
    >
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
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
            <Image
              source={{ uri: user?.Avatar }}
              className="size-[150px] bg-[#B9E5E8] rounded-full"
            />
            <TouchableOpacity className="absolute bottom-0 right-2 size-[35px] bg-[#4A628A] rounded-full border-2 border-[#97C9E3] flex items-center justify-center">
              <Image source={icons.pencil} />
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
            onChangeText={(text) => setUser((prev) => (prev ? { ...prev, Fullname: text } : null))}
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
            onChangeText={(text) => setUser((prev) => (prev ? { ...prev, UserName: text } : null))}
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
            onChangeText={(text) => setUser((prev) => (prev ? { ...prev, Address: text } : null))}
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
            onChangeText={(text) => setUser((prev) => (prev ? { ...prev, Email: text } : null))}
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
            <Image source={icons.arrowDown} className="size-4" />
          </TouchableOpacity>
          {isGenderPickerVisible && (
            <View className="absolute top-[80px] left-0 right-0 bg-[#DFF2EB] shadow-lg rounded-2xl z-10 border border-gray-300">
              <TouchableOpacity
                onPress={() => {
                  setSelectedGender("Male");
                  setUser((prev) => (prev ? { ...prev, Gender: "Male" } : null));
                  setIsGenderPickerVisible(false);
                }}
                className="p-4 border-b border-gray-200"
              >
                <Text className="text-center">Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedGender("Female");
                  setUser((prev) => (prev ? { ...prev, Gender: "Female" } : null));
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
        <View className="mt-2">
          <Button title="Update" backgroundColor="bg-[#4A628A]" onPress={handleUpdate} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ProfileDetail;
