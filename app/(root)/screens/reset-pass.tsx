import ActionIcon from "@/components/ActionIcon";
import Button from "@/components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft, Eye, EyeSlash } from "iconsax-react-native";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

const ResetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();

  return (
    <LinearGradient colors={["#DFF2EB87", "#4A628A87"]} locations={[0, 0.92]} className="flex-1 justify-center">
      <ScrollView className="flex-1 px-6">
        <View className="mt-8">
          <ActionIcon
            icon={<ArrowLeft size="24" color="#DFF2EB" variant="Outline" />}
            backgroundColor="bg-[#4A628A]"
            onPress={() => router.back()}
          />

          <Text className="text-[20px] text-center font-unbounded">New Password</Text>
        </View>

        <Text className="text-[14px] font-unbounded-light text-center mt-4">
          Your new password must be different {"\n"} from previously used passwords
        </Text>

        {/* Input Password */}
        <View className="mt-8">
          <Text className="text-[14px] font-unbounded-light mb-3">Password</Text>
          <View className="flex-row items-center bg-[#DFF2EB] rounded-2xl px-4">
            <TextInput
              className="flex-1 font-unbounded-light py-4"
              placeholder="Enter your password"
              placeholderTextColor="#A9A9A9"
              textAlignVertical="center"
              numberOfLines={1}
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} className="mr-2">
              <Text className="text-[14px] font-unbounded-light">
                {passwordVisible ? (
                  <EyeSlash size="20" color="#000000" variant="Bold" />
                ) : (
                  <Eye size="20" color="#000000" variant="Bold" />
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-8">
          <Text className="text-[14px] font-unbounded-light mb-3">Confirm Password</Text>
          <View className="flex-row items-center bg-[#DFF2EB] rounded-2xl px-4">
            <TextInput
              className="flex-1 font-unbounded-light py-4"
              placeholder="Enter your password"
              placeholderTextColor="#A9A9A9"
              textAlignVertical="center"
              numberOfLines={1}
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} className="mr-2">
              <Text className="text-[14px] font-unbounded-light">
                {passwordVisible ? (
                  <EyeSlash size="20" color="#000000" variant="Bold" />
                ) : (
                  <Eye size="20" color="#000000" variant="Bold" />
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* button */}
        <Button title="Create New Password" backgroundColor="bg-[#4A628A]" onPress={() => console.log("change pass")} />
      </ScrollView>
    </LinearGradient>
  );
};

export default ResetPassword;
