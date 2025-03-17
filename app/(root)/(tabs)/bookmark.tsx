import { View, Text, Image, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import { ArrowLeft, SearchNormal1, TickCircle } from "iconsax-react-native";
import ActionIcon from "@/components/ActionIcon";

interface Service {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  image: string;
}

const services: Service[] = [
  {
    id: "1",
    name: "Air Condition",
    category: "Electric Repair",
    rating: 4.8,
    reviews: 49,
    image: "https://example.com/air-condition.png",
  },
  {
    id: "2",
    name: "Washing Machine",
    category: "Electric Repair",
    rating: 4.8,
    reviews: 49,
    image: "https://example.com/washing-machine.png",
  },
  {
    id: "3",
    name: "Fridge",
    category: "Electric Repair",
    rating: 4.8,
    reviews: 49,
    image: "https://example.com/fridge.png",
  },
  {
    id: "4",
    name: "Barrel Oven",
    category: "Electric Repair",
    rating: 4.8,
    reviews: 49,
    image: "https://example.com/barrel-oven.png",
  },
];

const Bookmark = () => {
  return (
    <ImageBackground source={require("../../../assets/images/bg-signup.png")} className="flex-1 px-4 py-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <ActionIcon
          icon={<ArrowLeft size="24" color="#4A628A" />}
          backgroundColor="bg-[#DFF2EB]"
          onPress={() => console.log("Back pressed")}
        />
        <Text className="text-[20px] font-bold text-black">Top Service Provider</Text>
        <ActionIcon
          icon={<SearchNormal1 size="24" color="#4A628A" />}
          backgroundColor="bg-[#DFF2EB]"
          onPress={() => console.log("Search pressed")}
        />
      </View>

      {/* Service List */}
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View className="bg-[#C9EEF8] rounded-lg p-4 mb-4 shadow-lg">
            {/* Service Badge */}
            <View className="flex-row items-center bg-[#4A628A] px-3 py-1 rounded-lg self-start">
              <TickCircle size="16" color="white" />
              <Text className="text-white text-[12px] ml-2">Proffesional Services</Text>
            </View>

            {/* Service Info */}
            <View className="flex-row mt-3">
              <Image source={{ uri: item.image }} className="w-20 h-20 mr-4 rounded-lg" resizeMode="contain" />
              <View className="flex-1">
                <Text className="text-[18px] font-bold text-black">{item.name}</Text>
                <Text className="text-[14px] text-gray-700">{item.category}</Text>

                {/* Rating */}
                <View className="flex-row items-center mt-2">
                  <Text className="text-[14px] text-yellow-500">⭐⭐⭐⭐⭐</Text>
                  <Text className="text-[14px] text-black ml-2">{item.rating}</Text>
                  <Text className="text-[14px] text-gray-500 ml-1">| {item.reviews} Reviews</Text>
                </View>
              </View>
            </View>

            {/* View Services Button */}
            <TouchableOpacity className="bg-[#4A628A] py-3 rounded-lg mt-4">
              <Text className="text-center text-white text-[14px] font-bold">View Services</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ImageBackground>
  );
};

export default Bookmark;
