import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { getCurrentUser } from "@/services/auth.service";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
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

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("AccessToken");
      if (!token) {
        console.log("🚫 No token found, user is not logged in.");
        setUser(null);
        return;
      }
      const response = await getCurrentUser();
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
    
    setUser(null);
    router.replace("/screens/sign-in");
  };

  return (
    <GlobalContext.Provider value={{ isLoggedIn: !!user, user, login, logout }}>
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
