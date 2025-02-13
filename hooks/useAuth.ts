import { loginUser } from "@/services/auth.service";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

const useAuth = () => {
  const router = useRouter();
  const login = async (username: string, password: string) => {
    try {
      if (!username || !password) {
        throw new Error("Vui lòng nhập đầy đủ thông tin");
      }

      await loginUser({ UserName: username, Password: password });
      router.push("/(root)/(tabs)");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi đăng nhập",
        text2: error.message || "Đã có lỗi xảy ra",
        position: "top",
      });
      throw error;
    }
  };

  return { login };
};

export default useAuth;
