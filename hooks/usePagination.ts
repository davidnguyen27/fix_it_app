import { useCallback, useState } from "react";
import useLoading from "./useLoading";

interface UsePaginationResult<T> {
  data: T[];
  metaData: MetaData;
  isLoading: boolean;
  loadMore: (params: any) => void;
  refresh: (params: any) => void;
}

const usePagination = <T, TParams>(
  fetchFunction: (params: TParams) => Promise<{ data: T[]; metaData: MetaData }>,
  initialParams: TParams
): UsePaginationResult<T> => {
  const { loading, withLoading } = useLoading();

  const [data, setData] = useState<T[]>([]);
  const [metaData, setMetaData] = useState<MetaData>({
    CurrentPage: 1,
    TotalPages: 1,
    PageSize: (initialParams as any).PageSize ?? 30,
    TotalCount: 0,
    HasPrevious: false,
    HasNext: false,
  });

  const fetchData = useCallback(
    async (params: TParams, isLoadMore = false) => {
      if (loading) return;
      await withLoading(async () => {
        console.log("Fetching data with params in usePagination:", params);
        const response = await fetchFunction(params);
        setData((prev) => (isLoadMore ? [...prev, ...response.data] : response.data));
        setMetaData(response.metaData);
      });
    },
    [fetchFunction, withLoading, loading]
  );

  const loadMore = (params: TParams) => {
    if (metaData.HasNext && !loading) {
      const updatedParams = { ...params, PageNumber: metaData.CurrentPage + 1 };
      fetchData(updatedParams, true);
    }
  };

  const refresh = (params: TParams) => {
    const updatedParams = { ...params, PageNumber: 1 };
    fetchData(updatedParams, false);
  };

  return { data, metaData, isLoading: loading, loadMore, refresh };
};

export default usePagination;
