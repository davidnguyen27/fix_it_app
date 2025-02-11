import { getCurrentUser } from "@/services/auth.service";
import { registerUser } from "@/services/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const useUser = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const signUp = async (username: string, email: string, password: string) => {
    if (!username || !password || !email) {
      Toast.show({
        type: "error",
        text1: "Registration Error",
        text2: "All fields are required!",
      });
      return;
    }

    await registerUser({
      UserName: username,
      Password: password,
      Email: email,
    });

    Toast.show({
      type: "success",
      text1: "Registration Successful",
    });

    router.push("/(root)/screens/sign-in");
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

  return { signUp, user, refetch: fetchUser };
};

export default useUser;
