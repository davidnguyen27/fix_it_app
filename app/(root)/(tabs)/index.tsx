import CategoryItem from "@/components/CategoryItem";
import PopularServiceItem from "@/components/PopularServiceItem";
import icons from "@/constants/icons";
import { useRouter } from "expo-router";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const handleServicePress = () => {
    router.push("/(root)/screens/all-service");
  };

  return (
    <View className="flex-1">
      {/* Location and Search Bar */}
      <ImageBackground
        source={require("../../../assets/images/Rectangle 4.png")}
        className="px-4 pt-2 pb-4"
      >
        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <Text className="font-unbounded text-[18px] mr-1.5">Location</Text>
            <Image source={require("../../../assets/icons/triangle.png")} />
          </View>
          <TouchableOpacity className="bg-[#4A628A] p-1.5 rounded-full mt-2">
            <Image source={icons.notification} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center mt-3">
          <Image className="mr-2" source={require("../../../assets/icons/location-small.png")} />
          <Text className="font-unbounded text-[15px]">HCM, Viet Nam</Text>
        </View>
        <View className="flex-row items-center mt-4 bg-white rounded-full px-4 py-2 shadow-md">
          <Image source={require("../../../assets/icons/search-normal.png")} />
          <TextInput
            placeholder="Search Service"
            className="ml-2 flex-1 font-unbounded-light text-black text-[14px]"
          />
        </View>
      </ImageBackground>

      {/* Special For You */}
      <View className="px-5 mt-2">
        <View className="flex-row justify-between items-center">
          <Text className="font-unbounded text-[15px]">#SpecialForYou</Text>
          <Text className="font-unbounded text-[12px]">See all</Text>
        </View>
        <Image
          source={require("../../../assets/images/tho_sua_may_lanh.png")}
          className="w-full rounded-[28px] mt-4 mx-auto"
        />
      </View>

      {/* Category Section */}
      <View className="px-5 mt-4">
        <Text className="font-unbounded text-[15px]">Category</Text>
        <View className="flex-row mt-3 justify-between">
          {/* Home */}
          <CategoryItem
            icon={require("../../../assets/icons/house.png")}
            title="House"
            onPress={() => console.log("house")}
          />

          {/* Electricity */}
          <CategoryItem
            icon={require("../../../assets/icons/electricity.png")}
            title="Electricity"
            onPress={() => console.log("Electricity")}
          />

          {/* Plumber */}
          <CategoryItem
            icon={require("../../../assets/icons/plumber.png")}
            title="Plumber"
            onPress={() => console.log("Plumber")}
          />

          {/* Handcraft */}
          <CategoryItem
            icon={require("../../../assets/icons/hammer.png")}
            title="Handcraft"
            onPress={() => console.log("Handcraft")}
          />

          {/* More */}
          <CategoryItem
            icon={require("../../../assets/icons/more.png")}
            title="More"
            onPress={() => console.log("More")}
          />
        </View>
      </View>

      {/* Popular Services */}
      <View className="px-5 mt-6">
        <View className="flex-row justify-between items-center">
          <Text className="font-unbounded text-[14px]">Popular Service</Text>
          <Text className="font-unbounded text-[12px]">See all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mt-2">
          <PopularServiceItem onPress={handleServicePress} />
          <PopularServiceItem onPress={handleServicePress} />
        </ScrollView>
      </View>
    </View>
  );
}
