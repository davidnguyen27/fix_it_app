import ActionIcon from "@/components/ActionIcon";
import Button from "@/components/Button";
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
} from "react-native";

const ResetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();

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
            New Password
          </Text>
        </View>

        <Text className="text-[14px] font-unbounded-light text-center mt-4">
          Your new password must be different {"\n"} from previously used
          passwords
        </Text>

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
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              className="mr-2"
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

        <View className="mt-8">
          <Text className="text-[14px] font-unbounded-light mb-3">
            Confirm Password
          </Text>
          <View className="flex-row items-center bg-[#DFF2EB] rounded-2xl px-4">
            <TextInput
              className="flex-1 font-unbounded-light py-4"
              placeholder="Enter your password"
              placeholderTextColor="#A9A9A9"
              textAlignVertical="center"
              numberOfLines={1}
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              className="mr-2"
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

        {/* button */}
        <Button
          title="Create New Password"
          backgroundColor="bg-[#4A628A]"
          onPress={() => console.log("change pass")}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default ResetPassword;
