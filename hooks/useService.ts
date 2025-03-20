import { repairService, SearchServiceParams } from "@/services/repairs.service";
import usePagination from "./usePagination";
import useLoading from "./useLoading";
import { useEffect, useState } from "react";

const useRepairService = (initialParams?: SearchServiceParams) => {
  const { withLoading } = useLoading();
  const [service, setService] = useState<Service | null>(null);
  const [searchParams, setSearchParams] = useState<SearchServiceParams>({
    Active: true,
    PageNumber: 1,
    PageSize: 10,
    SearchName: "",
    CategoryId: "",
    ...initialParams,
  });

  const { data, isLoading, loadMore, metaData, refresh } = usePagination<Service, SearchServiceParams>(
    repairService.searchServices,
    searchParams
  );

  useEffect(() => {
    refresh(searchParams);
  }, [searchParams]);

  const getService = async (serviceId: string): Promise<Service | null> => {
    if (!serviceId) return null;
    return withLoading(async () => {
      const serviceData = await repairService.getService(serviceId);
      setService(serviceData);
      return serviceData.data;
    });
  };

  return { services: data, service, isLoading, loadMore, refresh, metaData, getService, setSearchParams };
};

export default useRepairService;
