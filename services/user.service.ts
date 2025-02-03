import { defaultAxiosInstance } from "./axiosConfig";

interface UserData {
  Fullname?: string;
  Gender?: string;
  Birthday?: string;
  Address?: string;
  UserName: string;
  Password: string;
  PhoneNumber: string;
}

export const registerUser = async (data: UserData) => {
  console.log("📡 Debug: Gửi request đăng ký với dữ liệu:", data);

  const formData = new FormData();
  formData.append("Fullname", data.Fullname || "");
  formData.append("Gender", data.Gender || "Male");
  formData.append("Birthday", data.Birthday || "2025-02-03");
  formData.append("Address", data.Address || "");
  formData.append("UserName", data.UserName);
  formData.append("Password", data.Password);
  formData.append("PhoneNumber", data.PhoneNumber);

  // Debug log dữ liệu FormData
  console.log("📡 Debug: Dữ liệu FormData chuẩn bị gửi:");
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  try {
    const response = await defaultAxiosInstance.post(
      "/api/authentication/customers",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("✅ Debug: Server trả về:", response);
    return response;
  } catch (error) {
    console.error("❌ Debug: Lỗi API:", error);
    throw error;
  }
};
