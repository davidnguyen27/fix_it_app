import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultAxiosInstance } from "./axiosConfig";

export const loginUser = async (data: { UserName: string; Password: string }) => {
 
    const response = await defaultAxiosInstance.post("/api/authentications/login", data);
    await AsyncStorage.setItem("AccessToken", response.data.AccessToken);
    await AsyncStorage.setItem("RefreshToken",  response.data.RefreshToken);
    return response;
  
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
export const forgetPassword = async (email: string) => {
  try {
    const response = await defaultAxiosInstance.post("/api/authentications/password-forgeting", email);
    return response;
  } catch (error) {
    console.error("❌ Lỗi khi quên mật khẩu:", error);
    throw error;
  }
};

export const resetPassword = async (data: { Email: string; Token: string; Password: string; ConfirmPassword: string }) => {
  try {
    const response = await defaultAxiosInstance.put("/api/authentications/password-forgeting", data);
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi đặt lại mật khẩu:", error);
    throw error;
  }
};