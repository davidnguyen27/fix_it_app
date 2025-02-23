import ActionIcon from "@/components/ActionIcon";
import icons from "@/constants/icons";
import { useDebounce } from "@/hooks/useDebounce";
import { useRepairs } from "@/hooks/useRepair";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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

  const [searchTerm, setSearchTerm] = useState("");
  const { repairs, loading, setParams } = useRepairs({
    Active: true,
    PageNumber: 1,
    PageSize: 50,
  });

  // Debounce search term để giảm số lần gọi API
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setParams((prev) => ({
        ...prev,
        SearchName: debouncedSearchTerm,
        PageNumber: 1,
      }));
    }
  }, [debouncedSearchTerm]);

  return (
    <ImageBackground
      source={require("../../../assets/images/background2.png")}
      className="flex-1 px-6 py-2"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 72 }}
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
            <TouchableOpacity>
              <Image source={require("../../../assets/icons/search-normal.png")} className="mr-4" />
            </TouchableOpacity>

            {/* Input Field */}
            <TextInput
              placeholder="Find somethings..."
              className="flex-1 text-[14px] font-unbounded-light"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
        </View>

        {/* Results Count */}
        <Text className="text-[15px] font-unbounded mb-6">20 Results Found</Text>

        {/* Result List */}
        <View>
          {repairs.map((repair) => (
            <TouchableOpacity
              key={repair.Id}
              onPress={() => router.push(`/(root)/properties/service/${repair.Id}`)}
              className="relative flex-row p-4 bg-white rounded-[15px] mb-4 shadow items-center"
            >
              {/* Image */}
              <Image source={{ uri: repair.Image }} className="size-16 mr-8" />

              {/* Info */}
              <View className="flex-1">
                <Text className="text-[8px] font-unbounded mb-2 bg-[#B9E5E8] px-2 py-1 rounded-[4px] self-start">
                  {repair.Category.Name}
                </Text>
                <Text className="text-[15px] font-unbounded">{repair.Name}</Text>
                <View className="flex-row items-center my-1">
                  <Image source={icons.user} className="size-5" tintColor="#4A628A" />
                  <Text className="text-[9px] font-unbounded ml-2">Worker</Text>
                </View>
                <Text className="text-[15px] font-unbounded">{repair.Price} VND</Text>
              </View>

              {/* Bookmark Icon */}
              <TouchableOpacity className="absolute top-3 right-3">
                <Image source={require("../../../assets/icons/archive-tick.png")} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Explore;
