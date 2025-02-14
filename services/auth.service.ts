import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultAxiosInstance } from "./axiosConfig";

export const loginUser = async (data: { UserName: string; Password: string }) => {
  try {
    const response = await defaultAxiosInstance.post("/api/authentications/login", data);
    await AsyncStorage.setItem("AccessToken", response.data.AccessToken);
    await AsyncStorage.setItem("RefreshToken",  response.data.RefreshToken);
    return response;
  } catch (error) {
    console.error("❌ Lỗi đăng nhập:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  const response = await defaultAxiosInstance.get("/api/authentications/current-user");
  return response.data;
};

export const refreshTokens = async (accessToken: string, refreshToken: string) => {
  try {
    const response = await defaultAxiosInstance.post("/api/authentications/refresh", {
      AccessToken: accessToken,
      RefreshToken: refreshToken,
    });
    return response.data; 

  } catch (error) {
    console.error("❌ Lỗi khi refresh token:", error);
    throw error;
  }
};