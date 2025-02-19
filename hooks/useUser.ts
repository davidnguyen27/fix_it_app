import { getCurrentUser } from "@/services/auth.service";
import { registerUser } from "@/services/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import useLoading from "./useLoading";

const useUser = () => {
  const router = useRouter();
  const { loading, withLoading } = useLoading();

  const [user, setUser] = useState<User | null>(null);

  const signUp = async (username: string, email: string, password: string) => {
    withLoading(async () => {
      await registerUser({
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

  const fetchUser = async () => {
    const token = await AsyncStorage.getItem("AccessToken");

    if (!token) {
      setUser(null);
      return;
    }

    await getCurrentUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    signUp,
    user,
    refetch: fetchUser,
    isLoading: loading,
  };
};

export default useUser;
