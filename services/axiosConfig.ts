import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

interface ErrorResponse {
  message?: string;
  errors?: { message?: string }[];
}

let setLoading: (loading: boolean) => void = () => {};

export const setGlobalLoadingHandler = (
  loadingHandler: (loading: boolean) => void
) => {
  setLoading = loadingHandler;
};



// Default Axios instance with loading effect
const defaultAxiosInstance: AxiosInstance = axios.create({
  baseURL: "https://fixitright.azurewebsites.net",
  headers: {
    "content-type": "application/json",
  },
  timeout: 300000,
  timeoutErrorMessage: "Connection timeout exceeded",
});

defaultAxiosInstance.interceptors.request.use(
  async (config) => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    setLoading(false);
    return Promise.reject(error);
  }
);

defaultAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    setLoading(false);
    return response.data;
  },
  (err: AxiosError<ErrorResponse>) => {
    setLoading(false);
    const { response } = err;
    if (response) {
      handleErrorByNotification(err);
    }
    return Promise.reject(err);
  }
);

// Separate Axios instance without loading effect for specific use cases
const axiosWithoutLoading: AxiosInstance = axios.create({
  baseURL: "https://fixitright.azurewebsites.net",
  headers: {
    "content-type": "multipart/form-data",
  },
  timeout: 300000,
  timeoutErrorMessage: "Connection timeout exceeded",
});

axiosWithoutLoading.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosWithoutLoading.interceptors.response.use(
  (response: AxiosResponse) => response.data,
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
  const message: string  = data?.message || "An error occurred";
  console.log("Error message: ", message);
  if (message) {
    Toast.show({
      type: "error",
      text1: "Notification",
      text2: message,
      position: "top",
      visibilityTime: 5000,
    });
  }

  
  return data?.errors ?? { message };
};




export { defaultAxiosInstance, axiosWithoutLoading };