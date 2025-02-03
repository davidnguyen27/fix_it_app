import ActionIcon from "@/components/ActionIcon";
import Button from "@/components/Button";
import useUser from "@/hooks/useUser";
import { useRouter } from "expo-router";
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

const SignUp = () => {
  const router = useRouter();
  const { signUp, isLoading } = useUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleRegister = () => {
    signUp(username, password, phoneNumber);
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/bg-signup.png")}
      resizeMode="cover"
      className="flex-1"
    >
      <ScrollView className="flex-1 px-6">
        <View className="mt-8">
          <ActionIcon
            icon={require("../../../assets/icons/arrow_left.png")}
            backgroundColor="bg-[#4A628A]"
            tintColor="#DFF2EB"
            onPress={() => router.back()}
          />

          <Text className="text-[20px] text-center font-unbounded">
            Create Account
          </Text>
        </View>

        <Text className="text-[14px] font-unbounded-light text-center mt-4">
          Fill your information or register with {"\n"} your social account
        </Text>

        {/* Input Username */}
        <View className="mt-8">
          <Text className="text-[14px] font-unbounded-light mb-3">
            Username
          </Text>
          <TextInput
            className="bg-[#DFF2EB] rounded-2xl px-4 py-4 font-unbounded-light"
            placeholder="Enter your username"
            placeholderTextColor="#A9A9A9"
            textAlignVertical="center"
            numberOfLines={1}
            maxLength={50}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Input Password */}
        <View className="mt-8">
          <Text className="text-[14px] font-unbounded-light mb-3">
            Password
          </Text>
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
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              className="px-2"
            >
              <Text className="text-[14px] font-unbounded-light">
                <Image
                  source={
                    passwordVisible
                      ? require("../../../assets/icons/eye-off.png")
                      : require("../../../assets/icons/eye-on.png")
                  }
                  className="size-6"
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Input PhoneNumber */}
        <View className="mt-8">
          <Text className="text-[14px] font-unbounded-light mb-3">
            Phone Number
          </Text>
          <TextInput
            className="bg-[#DFF2EB] rounded-2xl px-4 py-4 font-unbounded-light"
            placeholder="Enter your phone number"
            placeholderTextColor="#A9A9A9"
            textAlignVertical="center"
            numberOfLines={1}
            maxLength={15}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        {/* Checkbox */}
        <View className="flex-row items-center mt-6 ml-4">
          <TouchableOpacity
            onPress={() => setIsChecked(!isChecked)}
            className={`size-6 rounded-md border-2 ${
              isChecked ? "border-[#4A628A]" : "border-[#4A628A]"
            } items-center justify-center`}
          >
            {isChecked && (
              <Image
                source={require("../../../assets/icons/tick-square.png")}
              />
            )}
          </TouchableOpacity>
          <Text className="ml-3 font-unbounded text-[13px]">
            Agree with{" "}
            <Text className="font-unbounded-light underline">
              Term & Condition
            </Text>
          </Text>
        </View>

        {/* Sign Up button */}
        <View className="mt-8">
          {isLoading ? (
            <ActivityIndicator size="large" color="4A628A" />
          ) : (
            <Button
              title="Sign Up"
              backgroundColor="bg-[#4A628A]"
              onPress={handleRegister}
            />
          )}
        </View>

        {/* Sign in by social media */}
        <View className="flex-row items-center mt-8">
          <View className="flex-1 h-px bg-black" />
          <Text className="font-unbounded text-[13px] color-[#292D32] mx-3">
            Or sign in with
          </Text>
          <View className="flex-1 h-px bg-black" />
        </View>

        <View className="flex-row justify-center my-4">
          <TouchableOpacity className="p-4 rounded-full bg-[#D9D9D9]">
            <Image source={require("../../../assets/icons/apple-logo.png")} />
          </TouchableOpacity>
          <TouchableOpacity className="p-4 mx-5 rounded-full bg-[#D9D9D9]">
            <Image source={require("../../../assets/icons/google-logo.png")} />
          </TouchableOpacity>
          <TouchableOpacity className="p-4 rounded-full bg-[#D9D9D9]">
            <Image
              source={require("../../../assets/icons/facebook-logo.png")}
            />
          </TouchableOpacity>
        </View>

        <Text className="text-center font-unbounded-light text-[13px] text-[#292D32]">
          Already have an account?{" "}
          <Text
            onPress={() => router.push("/(root)/screens/sign-in")}
            className="font-unbounded underline"
          >
            Sign In
          </Text>
        </Text>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignUp;
