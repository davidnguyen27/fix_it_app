import { authService } from "@/services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import isEqual from "fast-deep-equal";

interface GlobalContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  reloadUser: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetched = useRef(false);

  const reloadUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser((prev) => (isEqual(prev, currentUser) ? prev : currentUser));
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("AccessToken");
        const refreshToken = await AsyncStorage.getItem("RefreshToken");

        if (!accessToken || !refreshToken) {
          setUser(null);
          return;
        }

        try {
          const currentUser = await authService.getCurrentUser();
          setUser((prev) => (isEqual(prev, currentUser) ? prev : currentUser));
        } catch (error) {
          const newTokens = await authService.refreshTokens(accessToken, refreshToken);
          await AsyncStorage.multiSet([
            ["AccessToken", newTokens.AccessToken],
            ["RefreshToken", newTokens.RefreshToken],
          ]);
          const currentUser = await authService.getCurrentUser();
          setUser((prev) => (isEqual(prev, currentUser) ? prev : currentUser));
        }
      } catch (e) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (!fetched.current) {
      fetched.current = true;
      fetchUser();
    }
  }, []);

  return <GlobalContext.Provider value={{ user, setUser, isLoading, reloadUser }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("GlobalContext must be used inside provider");
  return context;
};

export default GlobalProvider;
