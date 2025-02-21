import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import Toast from "react-native-toast-message";
import useLoading from "./useLoading";
import { useGlobalContext } from "@/context/GlobalProvider";

const useUser = () => {
  const { loading, withLoading } = useLoading();
  const { user, setUser } = useGlobalContext();

  const refetchUser = async () => {
    withLoading(async () => {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    });
  };

  const update = async () => {
    withLoading(async () => {
      if (!user) return;

      const newUser = {
        ...user,
        Fullname: user.Fullname,
        UserName: user.UserName,
        Address: user.Address,
        Email: user.Email,
        Gender: user.Gender,
      };

      await userService.updateUser(user.Id, newUser);
      setUser(newUser);
      Toast.show({ type: "success", text1: "Success", text2: "Profile updated successfully!" });
    });
  };

  return {
    user,
    isSignedIn: !!user,
    refetchUser,
    update,
    isLoading: loading,
  };
};

export default useUser;
