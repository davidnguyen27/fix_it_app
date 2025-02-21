import { defaultAxiosInstance } from "./axiosConfig";

interface DataRequest {
  CustomerId: string;
  ServiceId: string;
  WorkingDate: string;
  Address: string;
  WorkingTime: string;
}

export const bookingService = async (data: DataRequest) => {
  const response = await defaultAxiosInstance.post("/api/bookings", data);
  return response?.data;
};
