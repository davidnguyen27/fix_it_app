import { defaultAxiosInstance } from "./axiosConfig";

interface UserData {
  UserName: string;
  Email: string;
  Password: string;
}

export const registerUser = async (data: UserData) => {
  const response = await defaultAxiosInstance.post(
    "/api/authentications/customers",
    data
  );
  return response;
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
