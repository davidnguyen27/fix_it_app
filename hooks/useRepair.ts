import { useState, useEffect } from "react";
import { getRepairs, RepairParams } from "@/services/repairs.service";
import { RepairService } from "@/types/repair_service";

export const useRepairs = (initialParams: RepairParams) => {
  const [repairs, setRepairs] = useState<RepairService[]>([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<RepairParams>(initialParams);

  const fetchRepairs = async () => {
    setLoading(true);
    try {
      const data = await getRepairs(params);
      setRepairs(data);
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
