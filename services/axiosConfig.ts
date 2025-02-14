import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { BASE_URL } from "@/constants/baseUrl";

interface ErrorResponse {
  message?: string;
  errors?: { message?: string }[];
}

// Biến toàn cục để kiểm soát trạng thái loading
let isLoading = false;
let setLoading: (loading: boolean) => void = () => {};

export const setGlobalLoadingHandler = (loadingHandler: (loading: boolean) => void) => {
  setLoading = loadingHandler;
};

// Xử lý lỗi 401 (Unauthorized)
const handleUnauthorized = async (error: AxiosError<ErrorResponse>) => {
  const errMessage = error.response?.data?.message || "Unauthorized";

  if (error.config?.url?.includes("/api/authentications/login")) {
    return handleErrorByNotification(error);
  }

  await AsyncStorage.multiRemove(["AccessToken", "RefreshToken"]);
  Toast.show({
    type: "error",
    text1: "Session Expired",
    text2: "Please login again!",
    position: "top",
    visibilityTime: 4000,
  });

  return Promise.reject(new Error(errMessage));
};

// Handle API error
const handleErrorByNotification = (error: AxiosError<ErrorResponse>) => {
  const message = error.response?.data?.message || "Something went wrong!";

  Toast.show({
    type: "error",
    text1: "Notification",
    text2: message,
    position: "top",
    visibilityTime: 4000,
  });

  return Promise.reject(error);
};

// Set Content-Type
const autoSetContentType = (config: InternalAxiosRequestConfig) => {
  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }
};

// Create an Axios instance
const createAxiosInstance = (enableLoading: boolean = true): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
      Accept: "application/json",
    },
    validateStatus: (status) => status >= 200 && status <= 500,
  });

  // Request Interceptor
  instance.interceptors.request.use(
    async (config) => {
      if (enableLoading) {
        isLoading = true;
        setLoading(true);
      }

      // Lấy token ngay lập tức từ AsyncStorage
      const token = await AsyncStorage.getItem("AccessToken");
      // console.log("✅ Axios Token:", token);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      autoSetContentType(config);
      return config;
    },
    (error) => {
      if (enableLoading) {
        isLoading = false;
        setLoading(false);
      }
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  instance.interceptors.response.use(
    async (response: AxiosResponse) => {
      if (enableLoading) {
        isLoading = false;
        setLoading(false);
      }
      return response.data;
    },
    async (error: AxiosError<ErrorResponse>) => {
      if (enableLoading) {
        isLoading = false;
        setLoading(false);
      }
      if (error.response?.status === 401) {
        return handleUnauthorized(error);
      }
      return handleErrorByNotification(error);
    }
  );

  return instance;
};

// Create instances
const defaultAxiosInstance = createAxiosInstance(true);
const axiosWithoutLoading = createAxiosInstance(false);



export { defaultAxiosInstance, axiosWithoutLoading };
