import ActionIcon from "@/components/ActionIcon";
import Button from "@/components/Button";
import icons from "@/constants/icons";
import useCoundownTimer from "@/hooks/useCountdownTimer";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  ActivityIndicator,
} from "react-native";
import { authService } from "@/services/auth.service";
import useAuth from "@/hooks/useAuth";

const Verify = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const { resetPassword, isLoading } = useAuth();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const { timer, resetTimer } = useCoundownTimer(59);

  const handleResendCode = async () => {
    if (timer === 0) {
      resetTimer(); // Reset countdown timer
      try {
        await authService.forgetPassword(email as string);
        // Attempt to resend the OTP
        alert("OTP has been resent to your email.");
      } catch (error) {
        alert("There was an error resending the code. Please try again.");
      }
    }
  };

  const handleInputChange = (text: string, index: number) => {
    const sanitizedText = text.replace(/[^0-9]/g, ""); // Only allow numbers
    const newOtp = [...otp];
    newOtp[index] = sanitizedText;
    setOtp(newOtp);

    // Move focus to the next input if text is entered
    if (sanitizedText && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleChangePassword = async () => {
    if (password === confirmPassword) {
      const otpCode = otp.join("");
      await resetPassword({
        email: email as string,
        otp: otpCode,
        password,
        confirmPassword,
      });
      router.push("/screens/sign-in");
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

          <Text className="text-[20px] text-center font-unbounded">Verify Code</Text>
        </View>

        <Text className="text-[14px] font-unbounded-light text-center mt-4">
          Please enter your code we just sent {"\n"} to email {email}
        </Text>

        {/* OTP Inputs */}
        <View className="flex-row justify-center my-10 gap-4">
          {otp.map((_, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={otp[index]}
              onChangeText={(text) => handleInputChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              className="size-16 bg-[#4A628A] rounded-[11px] text-center text-white font-unbounded-medium text-[36px]"
            />
          ))}
        </View>

        <Text className="font-unbounded text-[13px] text-center text-[#292D32]">
          Didn't receive OTP?
        </Text>

        <TouchableOpacity
          onPress={handleResendCode}
          disabled={timer > 0} // Disable resend if timer is counting down
        >
          <Text
            className={`font-unbounded-semiBold text-[13px] text-center underline mt-3 mb-8 ${
              timer > 0 ? "font-unbounded-light text-[10px] text-gray-400" : "text-[#292D32]"
            }`}
          >
            {timer > 0 ? `Resend code in (${timer}s)` : "Resend code"}
          </Text>
        </TouchableOpacity>

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
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} className="mr-2">
              <Image
                source={passwordVisible ? icons.eyeOff : icons.eyeOn}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Confirm Password */}
        <View className="mt-8">
          <Text className="text-[14px] font-unbounded-light mb-3">Confirm Password</Text>
          <View className="flex-row items-center bg-[#DFF2EB] rounded-2xl px-4">
            <TextInput
              className="flex-1 font-unbounded-light py-4"
              placeholder="Confirm your password"
              placeholderTextColor="#A9A9A9"
              textAlignVertical="center"
              numberOfLines={1}
              secureTextEntry={!passwordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} className="mr-2">
              <Image
                source={passwordVisible ? icons.eyeOff : icons.eyeOn}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Change Password Button */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#4A628A" />
        ) : (
          <Button
            title="Change Password"
            backgroundColor="bg-[#4A628A]"
            onPress={handleChangePassword}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default Verify;
