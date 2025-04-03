import ActionIcon from "@/components/ActionIcon";
import useRepairService from "@/hooks/useService";
import { formatCurrencyVND } from "@/utils/CurrencyFormat";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArchiveTick, ArrowLeft, SearchNormal, User } from "iconsax-react-native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";

const Explore = () => {
  const router = useRouter();
  const { services, isLoading, loadMore, setSearchParams } = useRepairService({
    Active: true,
    PageNumber: 1,
    PageSize: 20,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);

  useEffect(() => {
    setSearchParams((prev) => ({
      ...prev,
      SearchName: "",
      PageNumber: 1,
    }));
  }, [setSearchParams]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((item) => item.Name.toLowerCase().includes(searchTerm.trim().toLowerCase()));
      setFilteredServices(filtered);
    }
  }, [searchTerm, services]);

  const renderItem: ListRenderItem<Service> = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/(root)/properties/service/${item.Id}`)}
      className="relative flex-row p-4 bg-white rounded-[15px] mb-4 shadow items-center"
    >
      <Image source={{ uri: item.Image }} className="size-16 mr-8" resizeMode="contain" />

      <View className="flex-1">
        <Text className="text-[8px] font-unbounded mb-2 bg-[#B9E5E8] px-2 py-1 rounded-[4px] self-start">
          {item.Category?.Name}
        </Text>
        <Text className="text-[15px] font-unbounded">{item.Name}</Text>
        <View className="flex-row items-center my-1">
          <User size="20" color="#4a628a" variant="Bold" />
          <Text className="text-[9px] font-unbounded ml-2">Worker</Text>
        </View>
        <Text className="text-[15px] font-unbounded">{formatCurrencyVND(item.Price)} VND</Text>
      </View>

      <TouchableOpacity className="absolute top-3 right-3">
        <ArchiveTick size="24" color="#4a628a" variant="Bold" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#B9E5E887", "#4A628A87"]} locations={[0.0, 0.92]} className="flex-1 px-6 py-2">
      {/* Header */}
      <View className="flex-row items-center mt-4 mb-8">
        {/* Back Icon */}
        <ActionIcon
          icon={<ArrowLeft size="24" color="#dff2eb" variant="Outline" />}
          backgroundColor="bg-[#4A628A]"
          onPress={() => router.back()}
        />

        {/* Search Input with Icons */}
        <View className="flex-row items-center max-w-[225px] flex-1 ml-10 bg-white rounded-[21px] px-4 py-0.5">
          {/* Search Icon */}
          <TouchableOpacity>
            <SearchNormal size="24" color="#292d32" variant="Outline" />
          </TouchableOpacity>

          {/* Input Field */}
          <TextInput
            placeholder="Find somethings..."
            className="flex-1 text-[14px] font-unbounded-light ml-3"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
      </View>

      {/* Results Count */}
      <Text className="text-[15px] font-unbounded mb-6">{services.length ?? 0} Results Found</Text>

      {/* Result List */}
      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.Id}
        extraData={filteredServices}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 72 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading ? <ActivityIndicator size="large" color="#4A628A" /> : null}
      />
    </LinearGradient>
  );
};

export default Explore;
