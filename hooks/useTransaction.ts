import { SearchTransactionParams, transactionService } from "@/services/transaction.service";
import usePagination from "./usePagination";
import { useCallback, useState } from "react";

const useTransaction = (initialParams: SearchTransactionParams) => {
  const [params, setParams] = useState<SearchTransactionParams>({
    ...initialParams,
    PageNumber: 1,
    PageSize: 50,
  });

  const { data, isLoading, loadMore, metaData, refresh } = usePagination<Transaction, SearchTransactionParams>(
    transactionService.searchTransactions,
    params
  );

  const handleLoadMore = useCallback(() => {
    setParams((prev) => ({ ...prev, PageNumber: prev.PageNumber + 1 }));
    loadMore(params);
  }, [loadMore, params]);

  const handleRefresh = useCallback(() => {
    setParams((prev) => ({ ...prev, PageNumber: 1 }));
    refresh(params);
  }, [refresh, params]);

  return { transactions: data, isLoading, loadMore: handleLoadMore, refresh: handleRefresh, metaData };
};

export default useTransaction;
