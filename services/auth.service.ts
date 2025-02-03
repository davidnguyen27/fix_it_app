import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultAxiosInstance } from "./axiosConfig";

export const loginUser = async (data: {
  UserName: string;
  Password: string;
}) => {
  const response = await defaultAxiosInstance.post(
    "/api/authentication/login",
    data
  );

  const { token } = response;
  if (token) await AsyncStorage.setItem("token", token);

  return response;
};

export const getCurrentUser = async () => {
  const response = await defaultAxiosInstance.get(
    "/api/authentication/current-user"
  );
  return response;
};
