import Button from "@/components/Button";
import icons from "@/constants/icons";
import ActionIcon from "@/components/ActionIcon";
import { loginUser } from "../../../services/auth.service";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";

const SignIn = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle sign in logic
  const handleSignIn = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const data = { UserName: username, Password: password };
      const response = await loginUser(data);

      if (response) {
        router.push("/(root)/(tabs)");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/bg-signup.png")}
      resizeMode="cover"
      className="flex-1 justify-center"
    >
      <ScrollView className="flex-1 px-6">
        <View className="flex-1 justify-center items-center mt-8"></View>
        <View className="mt-8">
          <ActionIcon
            icon={icons.arrowLeft}
            backgroundColor="bg-[#4A628A]"
            tintColor="#DFF2EB"
            onPress={() => router.push("/(root)/(tabs)")}
          />
          <Text className="text-[20px] text-center font-unbounded">Sign In</Text>
        </View>

        <Text className="text-[14px] font-unbounded-light text-center mt-4">
          Hi welcome back, you've been missed
        </Text>

        {/* Input Username */}
        <View className="mt-8 w-full">
          <Text className="text-[14px] font-unbounded-light mb-3">Username</Text>
          <TextInput
            className="bg-[#DFF2EB] rounded-2xl px-4 py-4 font-unbounded-light"
            placeholder="Enter your username"
            placeholderTextColor="#A9A9A9"
            maxLength={50}
            textAlignVertical="center"
            numberOfLines={1}
            value={username}
            onChangeText={setUsername}
            editable={!isLoading}
          />
        </View>

        {/* Input Password */}
        <View className="mt-8 w-full">
          <Text className="text-[14px] font-unbounded-light mb-3">Password</Text>
          <View className="flex-row items-center bg-[#DFF2EB] rounded-2xl px-4">
            <TextInput
              className="flex-1 font-unbounded-light py-4"
              placeholder="Enter your password"
              placeholderTextColor="#A9A9A9"
              textAlignVertical="center"
              numberOfLines={1}
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              className="mr-2"
              disabled={isLoading}
            >
              <Image source={passwordVisible ? icons.eyeOff : icons.eyeOn} className="size-6" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot password link */}
        <Link
          href="/(root)/screens/email-input"
          className="text-right text-[10px] underline font-unbounded-light mt-2 mr-4"
        >
          Forgot password?
        </Link>

        {/* Sign In button */}
        <View className="mt-8">
          {isLoading ? (
            <ActivityIndicator size="large" color="#4A628A" />
          ) : (
            <Button title="Sign In" backgroundColor="bg-[#4A628A]" onPress={handleSignIn} />
          )}
        </View>

        {/* Sign in by social media */}
        <View className="flex-row items-center mt-8">
          <View className="flex-1 h-px bg-black" />
          <Text className="font-unbounded text-[13px] text-[#292D32] mx-3">Or sign in with</Text>
          <View className="flex-1 h-px bg-black" />
        </View>

        <View className="flex-row justify-center my-4">
          <TouchableOpacity className="p-4 rounded-full bg-[#D9D9D9]">
            <Image source={icons.apple} />
          </TouchableOpacity>
          <TouchableOpacity className="p-4 mx-5 rounded-full bg-[#D9D9D9]">
            <Image source={icons.google} />
          </TouchableOpacity>
          <TouchableOpacity className="p-4 rounded-full bg-[#D9D9D9]">
            <Image source={icons.facebook} />
          </TouchableOpacity>
        </View>

        <Link
          href="/(root)/screens/sign-up"
          className="text-center font-unbounded-light text-[13px] text-[#292D32]"
        >
          Don’t have an account? <Text className="font-unbounded underline">Sign Up</Text>
        </Link>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignIn;
