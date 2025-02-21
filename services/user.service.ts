import { defaultAxiosInstance } from "./axiosConfig";

export const userService = {
  updateUser: async (id: string, data: Partial<User>) => {
    const response = await defaultAxiosInstance.put(`/api/users/${id}`, data);
    return response;
  },
};

export const GetAllRepairServices = async (params: {
  Active?: boolean;
  PageNumber: number;
  PageSize: number;
  SearchName?: string | null;
}) => {
  const URL_API = "/api/repair-services/get-services";

  const queryParams = new URLSearchParams({
    PageNumber: params.PageNumber.toString(),
    PageSize: params.PageSize.toString(),
  });

  if (params.Active !== undefined) {
    queryParams.append("Active", params.Active.toString());
  }

  if (params.SearchName) {
    queryParams.append("SearchName", params.SearchName);
  }

  const fullUrl = `${URL_API}?${queryParams.toString()}`;

  const response = await defaultAxiosInstance.post(fullUrl);

  return response.data;
};

export const GetRepairServiceById = async (serviceId: string) => {
  const URL_API = `/api/repair-services/${serviceId}`;
  const response = await defaultAxiosInstance.get(URL_API);
  return response.data;
};
