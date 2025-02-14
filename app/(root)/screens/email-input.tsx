import React, { useState } from "react";
import { View, Text, TextInput, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/Button"; // Assuming you have a Button component
import icons from "@/constants/icons"; // Ensure you have the icons available in the project
import ActionIcon from "@/components/ActionIcon";
import { forgetPassword } from "@/services/auth.service"; // Import the API logic

const EmailInput = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleNext = async () => {
    if (email) {
      try {
        console.log("Sending verification email to:", email);
         await forgetPassword(email);

        router.push(`/(root)/screens/verify?email=${email}`);
      } catch (error) {
        alert("There was an error sending the verification email. Please try again.");
      }
    } else {
      alert("Please enter a valid email address");
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/bg-signup.png")}
      resizeMode="cover"
      className="flex-1"
    >
      <View className="flex-1 px-6">
        <View className="mt-8">
          <ActionIcon
            icon={icons.arrowLeft}
            backgroundColor="bg-[#4A628A]"
            tintColor="#DFF2EB"
            onPress={() => router.back()}
          />
        </View>

        <Text className="text-[20px] text-center font-unbounded mt-8">
          Enter Your Email
        </Text>

        <Text className="text-[14px] font-unbounded-light text-center mt-4">
          We will send a verification code to your email
        </Text>

        {/* Input Email */}
        <View className="mt-8">
          <Text className="text-[14px] font-unbounded-light mb-3">Email Address</Text>
          <View className="flex-row items-center bg-[#DFF2EB] rounded-2xl px-4">
            <TextInput
              className="flex-1 font-unbounded-light py-4"
              placeholder="Enter your email"
              placeholderTextColor="#A9A9A9"
              textAlignVertical="center"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>

        {/* Next Button */}
        <Button
          title="Next"
          backgroundColor="bg-[#4A628A]"
          onPress={handleNext}
        />
      </View>
    </ImageBackground>
  );
};

export default EmailInput;
