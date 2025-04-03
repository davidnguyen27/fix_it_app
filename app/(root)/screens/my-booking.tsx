import { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import ActionIcon from "@/components/ActionIcon";
import { formatCurrencyVND } from "@/utils/CurrencyFormat";
import useUser from "@/hooks/useUser";
import useBooking from "@/hooks/useBooking";
import { ArrowLeft, SearchNormal, User } from "iconsax-react-native";
import { LinearGradient } from "expo-linear-gradient";

const tabs = ["Pending", "Accepted", "Completed", "Cancelled"];

const MyBooking = () => {
  const router = useRouter();
  const { user } = useUser();
  const [selectedTab, setSelectedTab] = useState<string>("Pending");
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

  const { bookings, isLoading, loadMore, refresh, updateParams, deleteBooking } = useBooking({
    customerId: user?.Id ?? "",
    Status: selectedTab,
    PageNumber: 1,
    PageSize: 50,
  });

  const changeTab = useCallback(
    (tab: string) => {
      setSelectedTab(tab);
      updateParams({ Status: tab, PageNumber: 1 });
    },
    [updateParams]
  );

  useEffect(() => {
    refresh();
  }, [selectedTab]);

  const toggleExpand = (id: string) => {
    setExpandedBooking(expandedBooking === id ? null : id);
  };

  const handleCancel = async (bookingId: string) => {
    await deleteBooking(bookingId);
    refresh();
    if (selectedTab === "Pending") {
      updateParams({ Status: "Cancelled", PageNumber: 1 });
    }
  };

  const renderItem = ({ item }: { item: Booking }) => (
    <View className="bg-white p-4 rounded-[15px] mb-4 shadow-lg">
      {/* Basic Info */}
      <View className="flex-row items-start">
        <Image source={{ uri: item.Service.Image }} className="size-24" resizeMode="contain" />
        <View className="flex-1 ml-14">
          <Text className="text-[11px] font-unbounded-light bg-[#CFE2E4] px-4 py-1 rounded-[7px] self-start">
            {item.Service?.Category?.Name}
          </Text>
          <Text className="text-[14px] font-unbounded-medium">{item.Service?.Name}</Text>
          <View className="flex-row items-center mt-1">
            <User size="20" color="#000000" variant="Bold" />
            <Text className="text-[11px] font-unbounded-light ml-1">Worker</Text>
          </View>
          <Text className="text-[13px] font-unbounded-semiBold mt-1">{formatCurrencyVND(item.Service.Price)} VND</Text>
        </View>
      </View>

      {/* Expanded Info */}
      {expandedBooking === item.Id && (
        <View className="mt-6">
          <View className="flex-row justify-between items-center">
            <Text className="text-[11px] font-unbounded-medium">Booking for</Text>
            <Text className="text-[11px] font-unbounded-medium text-[#404040]">
              {item.WorkingDate} | {item.WorkingTime}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-[11px] font-unbounded-medium">Address</Text>
            <Text className="text-[11px] font-unbounded-medium text-[#404040]">{item.Address}</Text>
          </View>

          {/* Buttons */}
          <View className="flex-row mx-auto gap-8 mt-8">
            {selectedTab === "Pending" && (
              <TouchableOpacity className="px-8 py-3 bg-[#D9D9D9] rounded-[15px]" onPress={() => handleCancel(item.Id)}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#4A628A" />
                ) : (
                  <Text className="text-[11px] font-unbounded-medium text-[#4A628A]">Cancel</Text>
                )}
              </TouchableOpacity>
            )}
            {selectedTab === "Completed" && (
              <TouchableOpacity
                className="px-8 py-3 bg-[#131A24] rounded-[15px]"
                onPress={() => router.push(`/properties/booking/${item.Id}`)}
              >
                <Text className="text-[11px] font-unbounded-medium text-white">E-Receipt</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* View More / View Less */}
      {selectedTab !== "Accepted" && (
        <TouchableOpacity className="mt-5" onPress={() => toggleExpand(item.Id)}>
          <Text className="text-[#004ED0] text-center font-unbounded-medium text-[11px]">
            {expandedBooking === item.Id ? "View Less ▲" : "View More ▼"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <LinearGradient colors={["#DFF2EB87", "#4A628A87"]} locations={[0, 0.92]} className="flex-1 px-6 py-6">
      {/* Header */}
      <View className="mb-8">
        <View className="flex-row justify-between items-center ">
          <ActionIcon
            icon={<ArrowLeft size="24" color="#dff2eb" variant="Outline" />}
            backgroundColor="bg-[#4A628A]"
            onPress={() => router.back()}
          />
          <ActionIcon
            icon={<SearchNormal size="24" color="#dff2eb" />}
            backgroundColor="bg-[#4A628A]"
            onPress={() => console.log("Search")}
          />
        </View>
        <Text className="text-[20px] font-unbounded text-center">My Bookings</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row justify-between mb-4">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`pb-2 ${selectedTab === tab ? "border-b-2 border-[#1B2530]" : ""}`}
            onPress={() => changeTab(tab)}
          >
            <Text className={`text-[13px] font-unbounded ${selectedTab === tab ? "text-[#004ED0]" : "text-black"}`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Booking List */}
      <FlatList
        data={bookings}
        keyExtractor={(item, index) => `${item.ServiceId}-${index}`}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading ? <ActivityIndicator size="large" color="#4A628A" /> : null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 64 }}
      />
    </LinearGradient>
  );
};

export default MyBooking;
