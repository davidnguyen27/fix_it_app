import { useState } from "react";
import { loginUser } from "@/services/auth.service";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username: string, password: string) => {
    if (!username || !password) {
      Toast.show({
        type: "error",
        text1: "Login Error",
        text2: "Username and Password cannot be empty.",
      });
      return;
    }

    setIsLoading(true);

    await loginUser({ UserName: username, Password: password });
    Toast.show({
      type: "success",
      text1: "Login Successful",
    });
    router.push("/profile");

    setIsLoading(false);
  };

  return { login, isLoading };
};

export default useAuth;
