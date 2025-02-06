import ActionIcon from "@/components/ActionIcon";
import Button from "@/components/Button";
import icons from "@/constants/icons";
import useCoundownTimer from "@/hooks/useCountdownTimer";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";

const Verify = () => {
  const router = useRouter();

  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const { timer, resetTimer } = useCoundownTimer(59);

  const handleResendCode = () => {
    if (timer === 0) {
      resetTimer(); // Đặt lại thời gian chờ
    }
  };

  const handleInputChange = (text: string, index: number) => {
    const sanitizedText = text.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = sanitizedText;
    setOtp(newOtp);

    // Chuyển đến ô tiếp theo nếu có dữ liệu
    if (sanitizedText && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
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

          <Text className="text-[20px] text-center font-unbounded">
            Verify Code
          </Text>
        </View>

        <Text className="text-[14px] font-unbounded-light text-center mt-4">
          Please enter your code we just sent {"\n"} to email example@gmail.com
        </Text>

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
          disabled={timer > 0} // Vô hiệu hóa khi đang đếm ngược
        >
          <Text
            className={`font-unbounded-semiBold text-[13px] text-center underline mt-3 mb-8 ${
              timer > 0
                ? "font-unbounded-light text-[10px] text-gray-400"
                : "text-[#292D32]"
            }`}
          >
            {timer > 0 ? `Resend code in (${timer}s)` : "Resend code"}
          </Text>
        </TouchableOpacity>

        {/* Verify button */}
        <Button
          title="Verify"
          backgroundColor="bg-[#4A628A]"
          onPress={() => router.push("/(root)/screens/reset-pass")}
        />
      </View>
    </ImageBackground>
  );
};

export default Verify;
