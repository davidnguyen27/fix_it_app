import { useState } from "react";
import { View, Text, TextInput, ImageBackground, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import ActionIcon from "@/components/ActionIcon";
import useAuth from "@/hooks/useAuth";
import { ArrowLeft } from "iconsax-react-native";

const EmailInput = () => {
  const router = useRouter();
  const { sendEmail, isLoading } = useAuth();
  const [email, setEmail] = useState<string>("");

  const handleNext = async () => {
    if (email) {
      await sendEmail(email);
      router.push(`/screens/verify?email=${email}`);
    }
  };

  return (
    <ImageBackground source={require("../../../assets/images/bg-signup.png")} resizeMode="cover" className="flex-1">
      <View className="flex-1 px-6">
        <View className="mt-8">
          <ActionIcon
            icon={<ArrowLeft size="24" color="#dff2eb" variant="Outline" />}
            backgroundColor="bg-[#4A628A]"
            onPress={() => router.back()}
          />
        </View>

        <Text className="text-[20px] text-center font-unbounded mt-8">Enter Your Email</Text>

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
        {isLoading ? (
          <ActivityIndicator size="large" color="#4A628A" />
        ) : (
          <Button title="Next" backgroundColor="bg-[#4A628A]" onPress={handleNext} />
        )}
      </View>
    </ImageBackground>
  );
};

export default EmailInput;
