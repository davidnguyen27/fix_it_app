import ActionIcon from "@/components/ActionIcon";
import MenuItem from "@/components/MenuItem";
import useUser from "@/hooks/useUser";
import useAuth from "@/hooks/useAuth";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  ArrowRight2,
  Calendar1,
  Card,
  Edit2,
  EmptyWallet,
  Location,
  Logout,
  Profile,
  SecuritySafe,
  Setting2,
} from "iconsax-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const ProfileScreen = () => {
  const router = useRouter();
  const { user } = useUser();
  const { logout } = useAuth();

  if (!user) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#4A628A" />
      </SafeAreaView>
    );
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View className="flex-1">
      {/* Header */}
      <LinearGradient colors={["#DFF2EB87", "#4A628A87"]} locations={[0.0, 1.0]} className="h-56 overflow-hidden">
        <View className="mt-5">
          <View className="ml-4">
            <ActionIcon
              icon={<ArrowLeft size="24" color="#dff2eb" variant="Outline" />}
              backgroundColor="bg-[#4A628A]"
              onPress={() => router.back()}
            />
          </View>
          <Text className="text-[#292D32] text-[20px] font-unbounded-semiBold text-center">Profile</Text>
        </View>
      </LinearGradient>

      {/* White Background Container */}
      <View className="bg-white rounded-t-[30px] -mt-7 px-6 flex-1">
        {/* Avatar */}
        <View className="items-center -mt-14">
          <View className="relative">
            <Image
              className="w-[120px] h-[120px] bg-[#B9E5E8] rounded-full"
              source={
                user?.Avatar
                  ? { uri: user.Avatar }
                  : { uri: "https://img.icons8.com/material/344/user-male-circle--v1.png" }
              }
            />
            <TouchableOpacity className="absolute bottom-0 right-2 w-[30px] h-[30px] bg-[#4A628A] rounded-full border-2 border-[#97C9E3] flex items-center justify-center">
              <Edit2 size="14" color="#dff2eb" />
            </TouchableOpacity>
          </View>

          {/* Full Name of User */}
          <Text className="mt-5 font-unbounded-medium text-[16px]">{user?.Fullname}</Text>
        </View>

        {/* List menu */}
        <ScrollView className="mt-6">
          <MenuItem
            icon={<Profile size="24" color="#000000" variant="Outline" />}
            title="Your Profile"
            mingcuteRight={<ArrowRight2 size="16" color="#000000" variant="Outline" />}
            onPress={() => router.push("/properties/profile/[id]")}
          />

          <MenuItem
            icon={<Location size="24" color="#000000" variant="Outline" />}
            title="Manage Address"
            mingcuteRight={<ArrowRight2 size="16" color="#000000" variant="Outline" />}
            onPress={() => console.log("Manage address!")}
          />

          <MenuItem
            icon={<Card size="24" color="#000000" variant="Outline" />}
            title="Payment Methods"
            mingcuteRight={<ArrowRight2 size="16" color="#000000" variant="Outline" />}
            onPress={() => console.log("Payment Methods!")}
          />

          <MenuItem
            icon={<Calendar1 size="24" color="#000000" variant="Outline" />}
            title="My Bookings"
            mingcuteRight={<ArrowRight2 size="16" color="#000000" variant="Outline" />}
            onPress={() => router.push("/screens/my-booking")}
          />

          <MenuItem
            icon={<EmptyWallet size="24" color="#000000" variant="Outline" />}
            title="My Wallet"
            mingcuteRight={<ArrowRight2 size="16" color="#000000" variant="Outline" />}
            onPress={() => router.push("/screens/my-wallet")}
          />

          <MenuItem
            icon={<Setting2 size="24" color="#000000" variant="Outline" />}
            title="Settings"
            mingcuteRight={<ArrowRight2 size="16" color="#000000" variant="Outline" />}
            onPress={() => router.push("/screens/payment-success")}
          />

          <MenuItem
            icon={<SecuritySafe size="24" color="#000000" variant="Outline" />}
            title="Privacy Policy"
            mingcuteRight={<ArrowRight2 size="16" color="#000000" variant="Outline" />}
            onPress={() => console.log("Privacy Policy!")}
          />

          <TouchableOpacity onPress={handleLogout} className="py-4">
            <View className="flex-row items-center">
              <Logout size="24" color="#000000" variant="Outline" />
              <Text className="font-unbounded text-[16px] ml-4">Logout</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;
