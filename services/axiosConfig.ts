import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { BASE_URL } from "@/constants/baseUrl";
// import { BASE_URL } from "@env";

interface ErrorResponse {
  type?: string;
  title?: string;
  status: number;
  message?: string;
  errors?: { message?: string }[];
}

// Default Axios instance with loading effect
const defaultAxiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  timeout: 30000,
  timeoutErrorMessage: "Connection timeout exceeded",
});

defaultAxiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("AccessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

defaultAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (err: AxiosError<ErrorResponse>) => {
    const { response } = err;
    if (response) {
      handleErrorByNotification(err);
    }
    return Promise.reject(err);
  }
);

// Error handler
const handleErrorByNotification = (errors: AxiosError<ErrorResponse>) => {
  const data = errors.response?.data as ErrorResponse;
  const errorMessage = data?.message || data?.title;

  Toast.show({
    type: "error",
    text1: "Notification",
    text2: errorMessage,
    position: "top",
    visibilityTime: 5000,
  });

  return errorMessage;
};

export { defaultAxiosInstance };
