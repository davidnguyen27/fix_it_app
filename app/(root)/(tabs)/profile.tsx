import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import ActionIcon from "@/components/ActionIcon";
import icons from "@/constants/icons";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const router = useRouter();

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
      <View className="bg-white rounded-t-[30px] -mt-6 px-6 flex-1">
        {/* Avatar */}
        <View className="items-center -mt-14">
          <View className="relative">
            <Image className="w-[120px] h-[120px] bg-[#B9E5E8] rounded-full" />
            <TouchableOpacity className="absolute bottom-0 right-2 w-[30px] h-[30px] bg-[#4A628A] rounded-full border-2 border-[#97C9E3] flex items-center justify-center">
              <Image source={icons.pencil} />
            </TouchableOpacity>
          </View>
          <Text className="mt-5 font-unbounded-medium text-[16px]">
            Lê Ngã Lễ
          </Text>
        </View>

        {/* List menu */}
        <ScrollView className="mt-6">
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-[#C5C5C5]">
            <View className="flex-row items-center">
              <Image className="mr-4" source={icons.profileLight} />
              <Text className="font-unbounded text-[16px]">Your Profile</Text>
            </View>
            <Image source={icons.mingcuteRight} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-[#C5C5C5]">
            <View className="flex-row items-center">
              <Image className="mr-4" source={icons.locationLight} />
              <Text className="font-unbounded text-[16px]">Manage Address</Text>
            </View>
            <Image source={icons.mingcuteRight} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-[#C5C5C5]">
            <View className="flex-row items-center">
              <Image className="mr-4" source={icons.fluentPayment} />
              <Text className="font-unbounded text-[16px]">
                Payment Methods
              </Text>
            </View>
            <Image source={icons.mingcuteRight} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-[#C5C5C5]">
            <View className="flex-row items-center">
              <Image className="mr-4" source={icons.calendar} />
              <Text className="font-unbounded text-[16px]">My Bookings</Text>
            </View>
            <Image source={icons.mingcuteRight} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-[#C5C5C5]">
            <View className="flex-row items-center">
              <Image className="mr-4" source={icons.wallet} />
              <Text className="font-unbounded text-[16px]">My Wallet</Text>
            </View>
            <Image source={icons.mingcuteRight} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-[#C5C5C5]">
            <View className="flex-row items-center">
              <Image className="mr-4" source={icons.setting} />
              <Text className="font-unbounded text-[16px]">Settings</Text>
            </View>
            <Image source={icons.mingcuteRight} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-[#C5C5C5]">
            <View className="flex-row items-center">
              <Image className="mr-4" source={icons.help} />
              <Text className="font-unbounded text-[16px]">Help Center</Text>
            </View>
            <Image source={icons.mingcuteRight} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-[#C5C5C5]">
            <View className="flex-row items-center">
              <Image className="mr-4" source={icons.policy} />
              <Text className="font-unbounded text-[16px]">Privacy Policy</Text>
            </View>
            <Image source={icons.mingcuteRight} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;
