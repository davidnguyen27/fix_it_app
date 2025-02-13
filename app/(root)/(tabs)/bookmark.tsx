import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from "react-native";

const Bookmark = () => {
  return (
    <View className="flex-1 p-4 bg-[#E8EEF5]">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <TouchableOpacity>
          {/* <Image source={require("../../../assets/icons/back.png")} className="w-6 h-6" /> */}
        </TouchableOpacity>
        <TextInput
          placeholder="Electric Repair"
          className="flex-1 ml-2 px-4 py-2 rounded-full bg-white shadow"
        />
      </View>

      {/* Results Count */}
      <Text className="text-base font-bold mb-4">20 Results Found</Text>

      {/* Result List */}
      <ScrollView>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <View key={index} className="flex-row p-4 bg-white rounded-xl mb-4 shadow items-center">
            {/* Image */}
            <Image
              // source={require("../../../assets/images/sample_repair.png")}
              className="w-16 h-16 rounded-md mr-4"
            />

            {/* Info */}
            <View className="flex-1">
              <Text className="text-xs text-[#4CAF50] font-bold mb-1 bg-[#D8F3DC] px-2 py-1 rounded-md self-start">
                Electric Repair
              </Text>
              <Text className="text-base font-bold">Fridge Repair</Text>
              <Text className="text-sm text-gray-500 mb-1">Worker Name</Text>
              <Text className="text-sm font-bold">200.000 VND</Text>
            </View>

            {/* Bookmark Icon */}
            <TouchableOpacity>
              {/* <Image source={require("../../../assets/icons/bookmark.png")} className="w-6 h-6" /> */}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Bookmark;
