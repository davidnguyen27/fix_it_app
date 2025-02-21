import { authService } from "@/services/auth.service";
import useLoading from "./useLoading";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuth = () => {
  const router = useRouter();
  const { loading, withLoading } = useLoading();
  const { setUser } = useGlobalContext();

  const signUp = async (username: string, email: string, password: string) => {
    withLoading(async () => {
      await authService.registerUser({
        UserName: username,
        Password: password,
        Email: email,
      });

      Toast.show({
        type: "success",
        text1: "Notification",
        text2: "Registration successful",
      });
      router.push("/screens/sign-in");
    });
  };

  const signIn = async (data: { UserName: string; Password: string }) => {
    return await withLoading(async () => {
      await authService.loginUser(data);
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      return true;
    });
  };

  const logout = async () => {
    withLoading(async () => {
      await AsyncStorage.multiRemove(["AccessToken", "RefreshToken"]);
      setUser(null);
      router.push("/(root)/(tabs)");
    });
  };

  const sendEmail = async (email: string) => {
    withLoading(async () => {
      await authService.forgetPassword(email);
      Toast.show({
        type: "success",
        text1: "Notification",
        text2: "Successfully, check your email!",
      });
    });
  };

  const resetPassword = async ({
    email,
    otp,
    password,
    confirmPassword,
  }: {
    email: string;
    otp: string;
    password: string;
    confirmPassword: string;
  }) => {
    withLoading(async () => {
      await authService.resetPassword({
        Email: email,
        Token: otp,
        Password: password,
        ConfirmPassword: confirmPassword,
      });
    });
  };

  return { signUp, signIn, logout, sendEmail, resetPassword, isLoading: loading };
};

export default useAuth;
