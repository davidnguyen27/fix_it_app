import ActionIcon from "@/components/ActionIcon";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "@/components/Button";
import Entypo from "@expo/vector-icons/Entypo";
import useBooking from "@/hooks/useBooking";
import useLoading from "@/hooks/useLoading";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { ArrowLeft, Heart } from "iconsax-react-native";
import { ratingService } from "@/services/rating.service";

const Review = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams() as { id: string };
  const { bookingDetail, fetchBookingDetail } = useBooking();
  const { loading, withLoading } = useLoading();
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");

  useEffect(() => {
    if (id) fetchBookingDetail(id);
  }, [id]);

  const handleSubmit = () => {
    withLoading(async () => {
      await ratingService.getRating({
        BookingId: id,
        Score: rating,
        Comment: reviewText,
      });
      setRating(0);
      setReviewText("");
    });
  };

  const renderStars = () => {
    return (
      <View className="flex-row justify-between my-6 border-b-hairline border-[#5A5A5A] pb-6">
        {Array.from({ length: 5 }, (_, i) => (
          <TouchableOpacity key={i} onPress={() => setRating(i + 1)}>
            <AntDesign name="star" size={73} color={i < rating ? "#FBFF00" : "#D3D3D3"} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ImageBackground source={require("../../../assets/images/background2.png")} className="flex-1">
      {/* Action Icons */}
      <View className="absolute top-6 left-4 flex-row gap-4 z-10">
        <ActionIcon
          icon={<ArrowLeft size={24} color="#DFF2EB" />}
          backgroundColor="bg-[#4A628A]"
          onPress={() => router.back()}
        />
      </View>
      <View className="absolute top-6 right-4 flex-row gap-4 z-10">
        <ActionIcon
          icon={<Entypo name="share" size={24} color="#DFF2EB" />}
          backgroundColor="bg-[#4A628A]"
          onPress={() => console.log("Share pressed")}
        />
        <ActionIcon
          icon={<Heart size={24} color="#DFF2EB" variant="Bold" />}
          backgroundColor="bg-[#4A628A]"
          onPress={() => console.log("Favorite pressed")}
        />
      </View>

      {/* Service Info */}
      <View className="absolute bottom-0 w-full h-[659px] bg-white rounded-t-[30px] p-6 shadow-lg">
        <View className="mb-6">
          <View className="flex-row items-center mb-4 mx-4">
            <Text className="text-[13px] font-unbounded-light text-[#193572] bg-[#7AB2D3] px-6 py-1 rounded-xl">
              Electric Repair
            </Text>
            <Text className="text-yellow-400 ml-2">★ 4.5 (365 reviews)</Text>
          </View>
          <Text className="text-[24px] font-unbounded-medium border-b-hairline border-[#5A5A5A] pb-2">
            {bookingDetail?.Service.Name}
          </Text>
        </View>

        {/* Rating Section */}
        <Text className="text-[14px] font-unbounded-light my-4 text-center">Your overall rating of this project</Text>
        <View className="items-center my-8">{renderStars()}</View>

        {/* Review Input */}
        <Text className="text-[13px] font-unbounded-medium mb-6">Add detailed review</Text>
        <TextInput
          className="p-3 rounded-[7px] font-unbounded-extra-light mb-6 h-36 bg-[#F3F3F3] text-start"
          placeholder="Enter here"
          value={reviewText}
          onChangeText={setReviewText}
          numberOfLines={6}
          multiline
        />

        {/* Submit Button */}
        <Button backgroundColor="bg-[#0A296D]" onPress={handleSubmit} title="Submit" />
      </View>
    </ImageBackground>
  );
};

export default Review;
