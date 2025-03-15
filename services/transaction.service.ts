import { defaultAxiosInstance } from "./axiosConfig";

export interface SearchTransactionParams {
  userId: string;
  PageNumber: number;
  PageSize: number;
}

export const transactionService = {
  searchTransactions: async (params: SearchTransactionParams) => {
    const response = await defaultAxiosInstance.post(
      `/api/transactions/${params.userId}?PageNumber=${params.PageNumber}&PageSize=${params.PageSize}`,
      {
        params,
      }
    );

    return {
      data: response?.data?.Data ?? [],
      metaData: response?.data?.MetaData ?? {
        CurrentPage: 1,
        TotalPages: 1,
        PageSize: params.PageSize ?? 50,
        TotalCount: 0,
        HasPrevious: false,
        HasNext: false,
      },
    };
  },
};
