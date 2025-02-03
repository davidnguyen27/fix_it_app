import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

interface ErrorResponse {
  message?: string;
  errors?: { message?: string }[];
}

// Global variable
let setLoading: (loading: boolean) => void = () => {};

export const setGlobalLoadingHandler = (
  loadingHandler: (loading: boolean) => void
) => {
  setLoading = loadingHandler;
};

// Handle Unauthorized (401)
const handleUnauthorized = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("refreshToken");

  Toast.show({
    type: "error",
    text1: "Session Expired",
    text2: "Please login again!",
    position: "top",
    visibilityTime: 5000,
  });

  return Promise.reject(new Error("Unauthorized - Please login again!"));
};

const handleErrorByNotification = (errors: AxiosError<ErrorResponse>) => {
  const data = errors.response?.data as ErrorResponse;
  const message: string = data?.message || "An error occurred";

  console.error("API Error: ", errors.response?.data || errors.message);

  if (message) {
    Toast.show({
      type: "error",
      text1: "Notification",
      text2: message,
      position: "top",
      visibilityTime: 5000,
    });
  }

  return Promise.reject(errors);
};

const autoSetContentType = (config: any) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
};

// Create defaultAxiosInstance with loading
const defaultAxiosInstance: AxiosInstance = axios.create({
  baseURL: "https://fixitright.azurewebsites.net",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  timeout: 30000,
  timeoutErrorMessage: "Connection timeout exceeded",
});

// Interceptor request
defaultAxiosInstance.interceptors.request.use(
  async (config) => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    autoSetContentType(config);
    return config;
  },
  (error) => {
    setLoading(false);
    return Promise.reject(error);
  }
);

// Interceptor response
defaultAxiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    setLoading(false);
    return response.data;
  },
  async (err: AxiosError<ErrorResponse>) => {
    setLoading(false);
    if (err.response?.status === 401) {
      return handleUnauthorized();
    }
    return handleErrorByNotification(err);
  }
);

const axiosWithoutLoading: AxiosInstance = axios.create({
  baseURL: "https://fixitright.azurewebsites.net",
  timeout: 30000,
  timeoutErrorMessage: "Connection timeout exceeded",
});

// Interceptor request (axiosWithoutLoading)
axiosWithoutLoading.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    autoSetContentType(config);
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response (axiosWithoutLoading)
axiosWithoutLoading.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (err: AxiosError<ErrorResponse>) => {
    if (err.response?.status === 401) {
      return handleUnauthorized();
    }
    return handleErrorByNotification(err);
  }
);

export { defaultAxiosInstance, axiosWithoutLoading };
