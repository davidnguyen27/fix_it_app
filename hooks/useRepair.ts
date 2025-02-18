import { useState, useEffect } from "react";
import { searchServices, SearchParams } from "@/services/repairs.service";
import { RepairService } from "@/types/repair_service";

export const useRepairs = (initialParams: SearchParams) => {
  const [repairs, setRepairs] = useState<RepairService[]>([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<SearchParams>(initialParams);

  const fetchRepairs = async () => {
    setLoading(true);
    try {
      const data = await searchServices(params);
      const filteredData = data.filter((repair: { Name: string }) =>
        repair.Name.toLowerCase().includes(params.SearchName?.toLowerCase() || "")
      );
      setRepairs(filteredData); // Lọc theo SearchName
    } catch (error) {
      console.error("Error fetching repairs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepairs();
  }, [params]);

  return { repairs, loading, setParams };
};
