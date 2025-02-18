import { getCurrentUser } from "@/services/auth.service";
import { registerUser } from "@/services/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const useUser = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility

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

    setModalVisible(true); // Show the modal after successful registration
  };

  const handleModalClose = () => {
    setModalVisible(false); // Close the modal when the user acknowledges it
    router.push("/(root)/screens/sign-in"); // Navigate to sign-in page
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
    isModalVisible,
    handleModalClose, // Expose the close function
  };
};

export default useUser;
