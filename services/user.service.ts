import { defaultAxiosInstance } from "./axiosConfig";

export const userService = {
  updateUser: async (id: string, data: Partial<User>) => {
    const response = await defaultAxiosInstance.put(`/api/users/${id}`, data);
    return response;
  },
};
