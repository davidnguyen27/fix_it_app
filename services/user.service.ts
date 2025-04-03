import { defaultAxiosInstance } from "../config/axios.config";

export const userService = {
  updateUser: async (id: string, data: Partial<User>) => {
    const response = await defaultAxiosInstance.put(`/api/users/${id}`, data);
    return response;
  },
};
