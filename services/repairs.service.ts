import { defaultAxiosInstance } from "./axiosConfig";

export interface RepairParams {
  Active: boolean;
  SearchName?: string;
  CategoryId?: string;
  PageNumber?: number;
  PageSize?: number;
}

export const getRepairs = async (params: RepairParams) => {
  try {
    const response = await defaultAxiosInstance.post("/api/repair-services/get-services", {
      params,
    });
    console.log(response?.data?.Data || []);
    return response?.data?.Data || [];
  } catch (error) {
    console.error("Error fetching repairs:", error);
    throw error;
  }
};
