import { defaultAxiosInstance } from "./axiosConfig";

interface UserData {
  UserName: string;
  Email: string;
  Password: string;
}

export const registerUser = async (data: UserData) => {
  const response = await defaultAxiosInstance.post(
    "/api/authentications/customers",
    data
  );
  return response;
};
