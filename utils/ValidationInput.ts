import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  username: Yup.string().min(3, "Too short!").required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
