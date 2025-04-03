import { defaultAxiosInstance } from "../config/axios.config";

export const ratingService = {
  getRating: async (data: Rating) => {
    const response = await defaultAxiosInstance.post("/api/ratings", data);
    return response.data;
  },
};
