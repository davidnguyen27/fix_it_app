import { setGlobalLoadingHandler } from "@/services/axiosConfig";
import { useEffect, useState } from "react";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setGlobalLoadingHandler(setIsLoading);
  }, []);

  return isLoading;
};
