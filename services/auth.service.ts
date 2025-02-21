import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultAxiosInstance } from "./axiosConfig";

export const authService = {
  registerUser: async (data: { UserName: string; Email: string; Password: string }) => {
    const response = await defaultAxiosInstance.post("/api/authentications/customers", data);
    return response;
  },

  loginUser: async (data: { UserName: string; Password: string }) => {
    const response = await defaultAxiosInstance.post("/api/authentications/login", data);
    await AsyncStorage.multiSet([
      ["AccessToken", response.data.AccessToken],
      ["RefreshToken", response.data.RefreshToken],
    ]);

    return response;
  },

  getCurrentUser: async () => {
    const response = await defaultAxiosInstance.get("/api/authentications/current-user");
    return response?.data;
  },

  refreshTokens: async (accessToken: string, refreshToken: string) => {
    const response = await defaultAxiosInstance.post("/api/authentications/refresh", {
      AccessToken: accessToken,
      RefreshToken: refreshToken,
    });
    return response.data;
  },

  forgetPassword: async (email: string) => {
    const response = await defaultAxiosInstance.post(
      "/api/authentications/password-forgeting",
      email
    );
    return response;
  },

  resetPassword: async (data: {
    Email: string;
    Token: string;
    Password: string;
    ConfirmPassword: string;
  }) => {
    const response = await defaultAxiosInstance.put(
      "/api/authentications/password-forgeting",
      data
    );
    return response.data;
  },
};
