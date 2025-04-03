import { defaultAxiosInstance } from "../config/axios.config";

export interface BookingDataRequest {
  CustomerId: string;
  ServiceId: string;
  WorkingDate: string;
  Address: string;
  WorkingTime: string;
  Note: string;
}

export interface SearchBookingParams {
  customerId: string;
  Status: string;
  PageNumber: number;
  PageSize: number;
}

export const bookingService = {
  createBooking: async (data: BookingDataRequest) => {
    const response = await defaultAxiosInstance.post("/api/bookings", data);
    return response?.data;
  },

  searchBookings: async (params: SearchBookingParams) => {
    const response = await defaultAxiosInstance.post(
      `/api/bookings/get-bookings-by-customer/${params.customerId}?Status=${params.Status}&PageNumber=${params.PageNumber}&PageSize=${params.PageSize}`,
      {
        params,
      }
    );
    return {
      data: response?.data?.Data ?? [],
      metaData: response?.data?.MetaData ?? {
        CurrentPage: 1,
        TotalPages: 1,
        PageSize: params.PageSize ?? 100,
        TotalCount: 0,
        HasPrevious: false,
        HasNext: false,
      },
    };
  },

  getBookingId: async (id: string) => {
    const response = await defaultAxiosInstance.get(`/api/bookings/${id}`);
    return response.data;
  },

  cancelBooking: async (id: string) => {
    const response = await defaultAxiosInstance.put(`/api/bookings/${id}`, { Status: "Cancelled" });
    return response;
  },
};
