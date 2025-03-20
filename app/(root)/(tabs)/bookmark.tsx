import { View, Text, Image, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator } from "react-native";
import { ArrowLeft, SearchNormal, TickCircle } from "iconsax-react-native";
import ActionIcon from "@/components/ActionIcon";
import { useRouter } from "expo-router";
import useRepairService from "@/hooks/useService";

const Bookmark = () => {
  const router = useRouter();

  const { services, isLoading, loadMore } = useRepairService({
    Active: true,
    PageNumber: 1,
    PageSize: 20,
  });

  return (
    <ImageBackground source={require("../../../assets/images/bg-signup.png")} className="flex-1 px-4 py-6">
      {/* Header */}
      <View className="flex-row justify-between items-center border-b-hairline border-[#5A5A5A] mb-4 pb-4">
        <ActionIcon
          icon={<ArrowLeft size="24" color="#DFF2EB" />}
          backgroundColor="bg-[#4A628A]"
          onPress={() => router.back()}
        />
        <Text className="text-[16px] font-unbounded-medium">Top Service Provider</Text>
        <ActionIcon
          icon={<SearchNormal size="24" color="#DFF2EB" />}
          backgroundColor="bg-[#4A628A]"
          onPress={() => console.log("Search pressed")}
        />
      </View>

      {/* Service List */}
      <FlatList
        data={services}
        keyExtractor={(item) => item.Id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        onEndReached={loadMore}
        ListFooterComponent={isLoading ? <ActivityIndicator size="large" color="#4A628A" /> : null}
        renderItem={({ item }) => (
          <View className="bg-[#B9E5E8] rounded-[11px] p-4 mb-4 shadow-sm">
            {/* Service Badge */}
            <View className="flex-row items-center bg-[#7AB2D3] px-3 py-1 rounded-lg self-end">
              <TickCircle size="16" color="black" variant="Bold" />
              <Text className="text-white text-[11px] font-unbounded-light ml-2">Proffesional Services</Text>
            </View>

            {/* Service Info */}
            <View className="flex-row mt-3">
              <Image source={{ uri: item.Image }} className="size-20 mr-4 rounded-lg" resizeMode="contain" />
              <View className="flex-1">
                <Text className="text-[14px] font-unbounded-medium">{item.Name}</Text>
                <Text className="text-[11px] font-unbounded-light">{item.Category.Name}</Text>

                {/* Rating */}
                {/* <View className="flex-row items-center mt-2">
                  <Text className="text-[14px] text-yellow-500">⭐⭐⭐⭐⭐</Text>
                  <Text className="text-[11px] font-unbounded-medium ml-2">{item.rating}</Text>
                  <Text className="text-[11px] font-unbounded-light ml-1">| {item.reviews} Reviews</Text>
                </View> */}
              </View>
            </View>

            {/* View Services Button */}
            <TouchableOpacity
              className="bg-[#4A628A] py-3 rounded-[9px] mt-4"
              onPress={() => router.push(`/(root)/properties/service/${item.Id}`)}
            >
              <Text className="text-center text-[#CBF5EA] text-[11px] font-unbounded-medium">View Services</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ImageBackground>
  );
};

export default Bookmark;
