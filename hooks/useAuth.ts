import { loginUser } from "@/services/auth.service";
import useLoading from "./useLoading";

interface LoginData {
  UserName: string;
  Password: string;
}

const useAuth = () => {
  const { loading, withLoading } = useLoading();

  const signIn = async (data: LoginData) => {
    return await withLoading(async () => {
      return await loginUser(data);
    });
  };

  return { signIn, isLoading: loading };
};

export default useAuth;
