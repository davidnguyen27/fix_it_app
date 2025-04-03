import { userService } from "@/services/user.service";
import Toast from "react-native-toast-message";
import useLoading from "./useLoading";
import { useGlobalContext } from "@/context/GlobalProvider";

const useUser = () => {
  const { loading, withLoading } = useLoading();
  const { user, reloadUser } = useGlobalContext();

  const update = async (updatedUser: User) => {
    await withLoading(async () => {
      await userService.updateUser(updatedUser.Id, updatedUser);
      await reloadUser();
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile updated successfully!",
      });
    });
  };

  return {
    user,
    isSignedIn: !!user,
    update,
    isLoading: loading,
  };
};

export default useUser;
