import ActionIcon from "@/components/ActionIcon";
import icons from "@/constants/icons";
import { repairService } from "@/services/repairs.service";
import { formatCurrencyVND } from "@/utils/CurrencyFormat";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ListRenderItem,
} from "react-native";

const Explore = () => {
  const router = useRouter();
  const [originData, setOriginData] = useState([]);
  const [dataService, setDataService] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const asyncData = async () => {
    try {
      const res = await repairService.testService();
      setOriginData(res);
      setDataService(res);
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    asyncData();
  }, []);
  const handleSearch = (text: string) => {
    setSearchTerm(text);
  };

  const handleSearchData = () => {
    if (!searchTerm) {
      setDataService(originData);
      return;
    }
    const dataFilter = originData.filter((item) =>
      item?.Name?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setDataService(dataFilter);
  };
  useEffect(() => {
    handleSearchData();
  }, [searchTerm]);

  const renderItem: ListRenderItem<Service> = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/(root)/properties/service/${item.Id}`)}
      className="relative flex-row p-4 bg-white rounded-[15px] mb-4 shadow items-center"
    >
      <Image
        source={{ uri: item.Image }}
        className="size-16 mr-8"
        resizeMode="contain"
      />

      <View className="flex-1">
        <Text className="text-[8px] font-unbounded mb-2 bg-[#B9E5E8] px-2 py-1 rounded-[4px] self-start">
          {item.Category?.Name}
        </Text>
        <Text className="text-[15px] font-unbounded">{item.Name}</Text>
        <View className="flex-row items-center my-1">
          <Image
            source={icons.user}
            className="size-5"
            tintColor="#4A628A"
            resizeMode="contain"
          />
          <Text className="text-[9px] font-unbounded ml-2">Worker</Text>
        </View>
        <Text className="text-[15px] font-unbounded">
          {formatCurrencyVND(item.Price)} VND
        </Text>
      </View>

      <TouchableOpacity className="absolute top-3 right-3">
        <Image
          source={require("../../../assets/icons/archive-tick.png")}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../../../assets/images/background2.png")}
      className="flex-1 px-6 py-2"
      resizeMode="cover"
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
            <Image
              source={require("../../../assets/icons/search-normal.png")}
              className="mr-4"
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Input Field */}
          <TextInput
            placeholder="Find somethings..."
            className="flex-1 text-[14px] font-unbounded-light"
            value={searchTerm}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {/* Results Count */}
      <Text className="text-[15px] font-unbounded mb-6">
        {dataService.length ?? 0} Results Found
      </Text>

      {/* Result List */}
      <FlatList
        data={dataService}
        keyExtractor={(item) => item.Id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 72 }}
        // onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        // ListFooterComponent={
        //   isLoading ? <ActivityIndicator size="large" color="#4A628A" /> : null
        // }
      />
    </ImageBackground>
  );
};

export default Explore;
