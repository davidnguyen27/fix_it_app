import { defaultAxiosInstance } from "./axiosConfig";

export interface SearchParams {
  Active: boolean;
  SearchName?: string;
  CategoryId?: string;
  PageNumber?: number;
  PageSize?: number;
}

export const repairService = {
  searchServices: async (params: SearchParams) => {
    const response = await defaultAxiosInstance.post("/api/repair-services/get-services", {
      params,
    });
    return response?.data?.Data || [];
  },

  getService: async (id: string) => {
    const response = await defaultAxiosInstance.get(`/api/repair-services/${id}`);
    console.log(response?.data);
    return response?.data;
  },
};
