import { View, Text, Image, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import icons from "@/constants/icons";
import ActionIcon from "@/components/ActionIcon";
import MenuItem from "@/components/MenuItem";
import { useRouter } from "expo-router";
import useUser from "@/hooks/useUser";
import useAuth from "@/hooks/useAuth";

const ProfileScreen = () => {
  const router = useRouter();
  const { user } = useUser();
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-unbounded text-[#292D32]">
          Please sign in to view your profile
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(root)/screens/sign-in")}
          className="mt-5 py-2 px-6 bg-[#4A628A] rounded-lg"
        >
          <Text className="text-white text-[16px]">Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1">
      {/* Header */}
      <ImageBackground
        source={require("../../../assets/images/bg-profile.png")}
        className="h-56 overflow-hidden"
      >
        <View className="mt-5">
          <View className="ml-4">
            <ActionIcon
              icon={icons.arrowLeft}
              backgroundColor="bg-[#4A628A]"
              tintColor="#DFF2EB"
              onPress={() => router.back()}
            />
          </View>
          <Text className="text-[#292D32] text-[20px] font-unbounded-semiBold text-center">
            Profile
          </Text>
        </View>
      </ImageBackground>

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
              <Image source={icons.pencil} />
            </TouchableOpacity>
          </View>
          <Text className="mt-5 font-unbounded-medium text-[16px]">
            {user?.Fullname} {/* Display the full name of the user */}
          </Text>
        </View>

        {/* List menu */}
        <ScrollView className="mt-6">
          <MenuItem
            icon={icons.profileLight}
            title="Your Profile"
            mingcuteRight={icons.mingcuteRight}
            onPress={() => router.push("/properties/profile/[id]")}
          />

          <MenuItem
            icon={icons.locationLight}
            title="Manage Address"
            mingcuteRight={icons.mingcuteRight}
            onPress={() => console.log("Manage address!")}
          />

          <MenuItem
            icon={icons.fluentPayment}
            title="Payment Methods"
            mingcuteRight={icons.mingcuteRight}
            onPress={() => console.log("Payment Methods!")}
          />

          <MenuItem
            icon={icons.calendar}
            title="My Bookings"
            mingcuteRight={icons.mingcuteRight}
            onPress={() => console.log("My Bookings!")}
          />

          <MenuItem
            icon={icons.wallet}
            title="My Wallet"
            mingcuteRight={icons.mingcuteRight}
            onPress={() => console.log("My Wallet!")}
          />

          <MenuItem
            icon={icons.setting}
            title="Settings"
            mingcuteRight={icons.mingcuteRight}
            onPress={() => console.log("Settings")}
          />

          <MenuItem
            icon={icons.policy}
            title="Privacy Policy"
            mingcuteRight={icons.mingcuteRight}
            onPress={() => console.log("Privacy Policy!")}
          />

          <TouchableOpacity onPress={handleLogout} className="py-4">
            <View className="flex-row items-center">
              <Image className="mr-4" source={icons.logout} />
              <Text className="font-unbounded text-[16px]">Logout</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;
