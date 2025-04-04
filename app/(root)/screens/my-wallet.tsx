import ActionIcon from "@/components/ActionIcon";
import useUser from "@/hooks/useUser";
import useTransaction from "@/hooks/useTransaction";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { formatCurrencyVND } from "@/utils/CurrencyFormat";
import { getTransactionCode } from "@/utils/TransactionCodeFormat";
import { useEffect } from "react";
import { ArrowLeft } from "iconsax-react-native";
import { LinearGradient } from "expo-linear-gradient";

const MyWallet = () => {
  const router = useRouter();
  const { user } = useUser();
  const { transactions, isLoading, loadMore, refresh } = useTransaction({
    userId: user?.Id ?? "",
    PageNumber: 1,
    PageSize: 50,
  });

  const walletBalance = user?.Balance;

  useEffect(() => {
    refresh();
  }, []);

  return (
    <LinearGradient colors={["#DFF2EB87", "#4A628A87"]} locations={[0, 0.92]} className="flex-1 p-6">
      {/* Back Button */}
      <ActionIcon
        icon={<ArrowLeft size="24" color="#dff2eb" variant="Outline" />}
        backgroundColor="bg-[#4A628A]"
        onPress={() => router.back()}
      />

      {/* Wallet Title */}
      <Text className="text-[20px] font-unbounded-medium text-center">Wallet</Text>

      {/* Wallet Balance */}
      <View className="bg-[#668DB0] p-4 rounded-[14px] mt-4">
        <Text className="text-[10px] font-unbounded-light">Wallet Balance</Text>
        <Text className="text-[10px] font-unbounded-medium">{formatCurrencyVND(walletBalance)} VND</Text>

        {/* Add Money Button */}
        <TouchableOpacity
          className="bg-[#B9E5E8] py-3.5 rounded-[14px] mt-4 text-center"
          onPress={() => router.push("/screens/enter-amount")}
        >
          <Text className="text-center text-[16px] font-unbounded-medium">Add Money</Text>
        </TouchableOpacity>
      </View>

      {/* Transactions List */}
      <FlatList
        data={[...transactions].reverse()}
        keyExtractor={(item) => item.Id}
        extraData={transactions}
        contentContainerStyle={{ paddingBottom: 72 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="mt-5 p-4 bg-white rounded-[14px]">
            {/* Ngày tháng giao dịch */}
            <Text className="font-unbounded-light text-[10px]">{new Date(item.CreatedAt).toLocaleDateString()}</Text>

            {/* Mã đơn + Số tiền + Trạng thái */}
            <View className="flex-row justify-between mt-2">
              <Text className="text-[13px] font-unbounded-semiBold">#{getTransactionCode(item.Id)}</Text>
              <Text className="text-[10px] font-unbounded-medium">
                {item.Status === "Success" ? "+" : ""}
                {`${formatCurrencyVND(item.Amount)} VND`}
              </Text>
            </View>

            {/* Trạng thái giao dịch */}
            <Text
              className={`${
                item.Status === "Success"
                  ? "text-green-600"
                  : item.Status === "Failed" || "Pending"
                  ? "text-red-600"
                  : null
              } text-xs font-unbounded-light mt-1`}
            >
              {item.Status === "Completed" ? "Success" : item.Status}
            </Text>
          </View>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading ? <ActivityIndicator size="large" color="#4A628A" /> : null}
      />
    </LinearGradient>
  );
};

export default MyWallet;
