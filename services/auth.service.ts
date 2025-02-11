import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultAxiosInstance, updateAxiosToken } from "./axiosConfig";

export const loginUser = async (data: { UserName: string; Password: string }) => {
  try {
    const response = await defaultAxiosInstance.post("/api/authentications/login", data);
    console.log("🔹 Login Response:", response.data);

    const AccessToken = response.data.data?.AccessToken;

    if (!AccessToken) {
      console.error("❌ Không nhận được AccessToken từ API!");
      throw new Error("Missing access token");
    }

    await AsyncStorage.setItem("AccessToken", AccessToken);
    await updateAxiosToken(); // Cập nhật token ngay lập tức

    console.log("✅ Token mới đã lưu vào AsyncStorage:", AccessToken);
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
