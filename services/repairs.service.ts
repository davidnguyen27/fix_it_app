import { defaultAxiosInstance } from "./axiosConfig";

export interface SearchServiceParams {
  Active: boolean;
  SearchName?: string;
  CategoryId?: string;
  PageNumber?: number;
  PageSize?: number;
}

export const repairService = {
  searchServices: async (params: SearchServiceParams) => {
    console.log("Params: ", params);
    const response = await defaultAxiosInstance.post(
      `/api/repair-services/get-services?Active=${params.Active}&PageNumber=${params.PageNumber}&PageSize=${params.PageSize}`,
      {
        params,
      }
    );
    console.log("Data response: ", response?.data?.Data);
    return {
      data: response?.data?.Data ?? [],
      metaData: response?.data?.MetaData ?? {
        CurrentPage: 1,
        TotalPages: 1,
        PageSize: params.PageSize ?? 20,
        TotalCount: 0,
        HasPrevious: false,
        HasNext: false,
      },
    };
  },

  getService: async (id: string) => {
    const response = await defaultAxiosInstance.get(`/api/repair-services/${id}`);
    return response?.data;
  },
};
