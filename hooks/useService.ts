import { repairService, SearchServiceParams } from "@/services/repairs.service";
import usePagination from "./usePagination";
import useLoading from "./useLoading";
import { useState } from "react";

const useRepairService = (initialParams?: SearchServiceParams) => {
  const { withLoading } = useLoading();
  const [service, setService] = useState<Service | null>(null);

  const { data, isLoading, loadMore, metaData, refresh } = usePagination<Service, SearchServiceParams>(
    repairService.searchServices,
    {
      Active: initialParams?.Active || false,
      SearchName: initialParams?.SearchName || "",
      CategoryId: initialParams?.CategoryId || "",
      PageNumber: initialParams?.PageNumber || 1,
      PageSize: initialParams?.PageSize || 20,
    }
  );

  const getService = async (serviceId: string): Promise<Service | null> => {
    if (!serviceId) return null;
    return withLoading(async () => {
      const serviceData = await repairService.getService(serviceId);
      setService(serviceData);
      return serviceData.data;
    });
  };

  return { services: data, service, isLoading, loadMore, refresh, metaData, getService };
};

export default useRepairService;
