import { BookingDataRequest, SearchBookingParams, bookingService } from "@/services/bookings.service";
import useLoading from "./useLoading";
import usePagination from "./usePagination";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const useBooking = (initialParams?: SearchBookingParams) => {
  const { loading, withLoading } = useLoading();
  const [bookingDetail, setBookingDetail] = useState<Booking | null>(null);
  const [params, setParams] = useState<SearchBookingParams>({
    customerId: initialParams?.customerId ?? "",
    Status: initialParams?.Status ?? "Pending",
    PageNumber: initialParams?.PageNumber ?? 1,
    PageSize: initialParams?.PageSize ?? 50,
  });

  const createBooking = async (data: BookingDataRequest) => {
    return withLoading(async () => {
      const response = await bookingService.createBooking(data);
      return response;
    });
  };

  const {
    data,
    loadMore,
    refresh: refreshPagination,
  } = usePagination<Booking, SearchBookingParams>(bookingService.searchBookings, params);

  const deleteBooking = async (bookingId: string) => {
    withLoading(async () => {
      await bookingService.cancelBooking(bookingId);
      refreshPagination(params);
      Toast.show({
        type: "success",
        text1: "Cancelled Successfully",
        position: "top",
        visibilityTime: 5000,
      });
    });
  };

  const fetchBookingDetail = async (id: string) => {
    withLoading(async () => {
      const response: Booking = await bookingService.getBookingId(id);
      setBookingDetail(response);
      return response;
    });
  };

  const updateParams = useCallback((newParams: Partial<SearchBookingParams>) => {
    setParams((prev) => {
      const updatedParams = { ...prev, ...newParams };
      console.log("Updated params in useBooking:", updatedParams);
      return updatedParams;
    });
  }, []);

  useEffect(() => {
    console.log("Fetching with params:", params);
    refreshPagination(params);
  }, [params]);

  return {
    createBooking,
    isLoading: loading,
    bookings: data,
    loadMore: () => loadMore(params),
    refresh: () => refreshPagination(params),
    updateParams,
    deleteBooking,
    fetchBookingDetail,
    bookingDetail,
  };
};

export default useBooking;
