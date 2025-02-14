import ActionIcon from "@/components/ActionIcon";
import icons from "@/constants/icons";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const Explore = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../../assets/images/background2.png")}
      className="flex-1 px-6 py-2"
    >
      {/* Header */}
      <View className="flex-row items-center mt-4 mb-8">
        {/* Back Icon */}
        <ActionIcon
          icon={icons.arrowLeft}
          backgroundColor="bg-[#4A628A]"
          tintColor="#DFF2EB"
          onPress={() => router.back()}
        />

        {/* Search Input with Icons */}
        <View className="flex-row items-center max-w-[225px] flex-1 ml-10 bg-white rounded-[21px] px-3.5 py-0.5">
          {/* Search Icon */}
          <Image source={require("../../../assets/icons/search-normal.png")} className="mr-4" />

          {/* Input Field */}
          <TextInput
            placeholder="Electric Repair"
            className="flex-1 text-[14px] font-unbounded-light"
          />
        </View>
      </View>

      {/* Results Count */}
      <Text className="text-[15px] font-unbounded mb-6">20 Results Found</Text>

      {/* Result List */}
      <ScrollView>
        <View className="relative flex-row p-4 bg-white rounded-[15px] mb-4 shadow items-center">
          {/* Image */}
          <Image source={require("../../../assets/images/tulanh.png")} className="mr-8" />

          {/* Info */}
          <View className="flex-1">
            <Text className="text-[8px] font-unbounded mb-2 bg-[#B9E5E8] px-2 py-1 rounded-[4px] self-start">
              Electric Repair
            </Text>
            <Text className="text-[15px] font-unbounded">Fridge Repair</Text>
            <View className="flex-row items-center my-1">
              <Image source={icons.user} className="size-5" tintColor="#4A628A" />
              <Text className="text-[9px] font-unbounded ml-2">Worker Name</Text>
            </View>
            <Text className="text-[15px] font-unbounded">200.000 VND</Text>
          </View>

          {/* Bookmark Icon */}
          <TouchableOpacity className="absolute top-3 right-3">
            <Image source={require("../../../assets/icons/archive-tick.png")} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Explore;
