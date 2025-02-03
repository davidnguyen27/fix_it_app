import { registerUser } from "@/services/user.service";
import { useRouter } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

const useUser = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (
    username: string,
    password: string,
    phoneNumber: string
  ) => {
    if (!username || !password || !phoneNumber) {
      Toast.show({
        type: "error",
        text1: "Registration Error",
        text2: "All fields are required!",
      });
      return;
    }

    console.log("Data registration: ", {
      username,
      password,
      phoneNumber,
    });

    setIsLoading(true);
    try {
      const response = await registerUser({
        UserName: username,
        Password: password,
        PhoneNumber: phoneNumber,
      });

      console.log("✅ Debug: Phản hồi từ server:", response);

      Toast.show({
        type: "success",
        text1: "Account created",
        text2: "You can now log in",
      });

      router.push("/(root)/screens/sign-in");
    } catch (error) {
      console.error("❌ Debug: Lỗi đăng ký:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading };
};

export default useUser;
