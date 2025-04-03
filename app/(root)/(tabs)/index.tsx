import AntDesign from "@expo/vector-icons/AntDesign";
import CategoryItem from "@/components/CategoryItem";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import PopularServiceItem from "@/components/PopularServiceItem";
import { ElementEqual, Location, Notification, SearchNormal } from "iconsax-react-native";
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "@/constants/images";

export default function Index() {
  return (
    <View className="flex-1">
      {/* Location and Search Bar */}
      <LinearGradient colors={["#DFF2EB87", "#7AB2D387"]} locations={[0.0, 1.0]} className="px-4 pt-2 pb-4">
        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <Text className="font-unbounded text-[18px] mr-1.5">Location</Text>
            <AntDesign name="caretdown" size={12} color="#4535C1" />
          </View>
          <TouchableOpacity className="bg-[#4A628A] p-1.5 rounded-full mt-2">
            <Notification size="24" color="#dff2eb" variant="Bold" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center mt-3">
          <Location size="18" color="#4a628a" variant="Bold" />
          <Text className="font-unbounded text-[15px]">HCM, Viet Nam</Text>
        </View>
        <View className="flex-row items-center mt-4 bg-white rounded-full px-4 py-2 shadow-md">
          <SearchNormal size="24" color="#292d32" variant="Outline" />
          <TextInput placeholder="Search Service" className="ml-2 flex-1 font-unbounded-light text-black text-[14px]" />
        </View>
      </LinearGradient>

      {/* Special For You */}
      <View className="px-5 mt-2">
        <View className="flex-row justify-between items-center">
          <Text className="font-unbounded text-[15px]">#SpecialForYou</Text>
          <Text className="font-unbounded text-[12px]">See all</Text>
        </View>
        <Image source={images.AirConditioner} className="w-full rounded-[28px] mt-4 mx-auto" />
      </View>

      {/* Category Section */}
      <View className="px-5 mt-4">
        <Text className="font-unbounded text-[15px]">Category</Text>
        <View className="flex-row mt-3 justify-between">
          {/* Home */}
          <CategoryItem
            icon={<Octicons name="home" size={28} color="#ffffff" />}
            title="House"
            onPress={() => console.log("house")}
          />

          {/* Electricity */}
          <CategoryItem
            icon={<MaterialIcons name="electric-bolt" size={28} color="#ffffff" />}
            title="Electricity"
            onPress={() => console.log("Electricity")}
          />

          {/* Plumber */}
          <CategoryItem
            icon={<FontAwesome6 name="faucet-drip" size={28} color="#ffffff" />}
            title="Plumber"
            onPress={() => console.log("Plumber")}
          />

          {/* Handcraft */}
          <CategoryItem
            icon={<Ionicons name="hammer-outline" size={28} color="#ffffff" />}
            title="Handcraft"
            onPress={() => console.log("Handcraft")}
          />

          {/* More */}
          <CategoryItem
            icon={<ElementEqual size="28" color="#ffffff" variant="Outline" />}
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
          <PopularServiceItem
            image={images.PopularService1}
            onPress={() => Alert.alert("Function not supported yet!")}
          />
          <PopularServiceItem
            image={images.PopularService2}
            onPress={() => Alert.alert("Function not supported yet!")}
          />
        </ScrollView>
      </View>
    </View>
  );
}
