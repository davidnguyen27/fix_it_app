import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { getCurrentUser } from "@/services/auth.service";
import { useLoading } from "@/hooks/useLoading";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultAxiosInstance } from "@/services/axiosConfig";
import { updateAxiosToken } from "@/services/axiosConfig";

interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { login: authLogin } = useAuth();
  const isLoading = useLoading();

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("AccessToken");
      if (!token) {
        console.log("🚫 No token found, user is not logged in.");
        setUser(null);
        return;
      }

      // Cập nhật token trước khi gọi API
      await updateAxiosToken();

      const response = await getCurrentUser();
      console.log("🔍 User Data from API:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("❌ Error fetching user:", error);
      await AsyncStorage.removeItem("AccessToken");
      setUser(null);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await authLogin(username, password);

      // Sau khi đăng nhập thành công, kiểm tra lại trạng thái
      await checkLoginStatus();

      router.replace("/(root)/(tabs)");
    } catch (error) {
      console.error("❌ Login failed:", error);
      setUser(null);
    }
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["AccessToken", "RefreshToken"]);
    await updateAxiosToken();
    setUser(null);
    router.replace("/landing");
  };

  return (
    <GlobalContext.Provider value={{ isLoggedIn: !!user, user, isLoading, login, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalProvider;
