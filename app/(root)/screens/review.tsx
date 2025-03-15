import ActionIcon from "@/components/ActionIcon";
import Button from "@/components/Button";
import useBooking from "@/hooks/useBooking";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { Star1, Camera, ArrowLeft, Heart, Share } from "iconsax-react-native";

const Review = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams() as { id: string };
  const { bookingDetail, fetchBookingDetail } = useBooking();
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");

  useEffect(() => {
    if (id) fetchBookingDetail(id);
  }, [id]);

  const handleSubmit = () => {
    console.log("Submit review:", { id, rating, reviewText });
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <TouchableOpacity key={i} onPress={() => setRating(i + 1)}>
        <Star1 size={40} color={i < rating ? "#FFD700" : "#D3D3D3"} variant="Bold" />
      </TouchableOpacity>
    ));
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/background2.png")}
      resizeMode="cover"
      className="flex-1 px-6 py-6"
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <ActionIcon
          icon={<ArrowLeft size="28" color="#dff2eb" />}
          backgroundColor="bg-[#4A628A]"
          onPress={() => router.back()}
        />
        <View className="flex-row gap-2">
          <ActionIcon
            icon={<Share size="28" color="#dff2eb" variant="Bold" />}
            backgroundColor="bg-[#4A628A]"
            onPress={() => console.log("Share pressed")}
          />
          <ActionIcon
            icon={<Heart size="28" color="#dff2eb" variant="Bold" />}
            backgroundColor="bg-[#4A628A]"
            onPress={() => console.log("Favorite pressed")}
          />
        </View>
      </View>

      {/* Service Info */}
      <View className="bg-white p-4 rounded-2xl shadow-lg mb-4">
        <View className="flex-row items-center mb-2">
          <Text className="text-sm font-medium text-[#4A628A] bg-blue-200 px-3 py-1 rounded-xl">Electric Repair</Text>
          <Text className="text-yellow-400 ml-2">★ 4.5 (365 reviews)</Text>
        </View>
        <Text className="text-2xl font-bold border-b border-gray-300 pb-2">{bookingDetail?.Service.Name}</Text>
      </View>

      {/* Rating Section */}
      <View className="bg-white p-6 rounded-2xl shadow-lg mb-4 items-center">
        <Text className="text-lg font-medium text-gray-500 mb-3">Your overall rating of this project</Text>
        <View className="flex-row space-x-2">{renderStars()}</View>
      </View>

      {/* Review Input */}
      <View className="bg-white p-6 rounded-2xl shadow-lg mb-4">
        <Text className="text-lg font-medium text-gray-500 mb-2">Add detailed review</Text>
        <TextInput
          className="border border-gray-300 p-3 rounded-xl text-gray-500"
          placeholder="Enter here"
          value={reviewText}
          onChangeText={setReviewText}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity className="flex-row items-center mt-4">
          <Camera size={24} color="#4A628A" className="mr-2" />
          <Text className="text-[#4A628A] text-sm">add photo</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <Button backgroundColor="bg-[#3E547D]" onPress={handleSubmit} title="Submit" />
    </ImageBackground>
  );
};

export default Review;
