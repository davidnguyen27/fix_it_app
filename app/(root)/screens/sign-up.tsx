import ActionIcon from "@/components/ActionIcon";
import Button from "@/components/Button";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, ActivityIndicator } from "react-native";
import { SignUpSchema } from "@/utils/ValidationInput";
import { ArrowLeft, Eye, EyeSlash } from "iconsax-react-native";

const SignUp = () => {
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { signUp, isLoading } = useAuth();

  const handleRegister = (values: { username: string; email: string; password: string }) => {
    return signUp(values.username, values.email, values.password);
  };

  return (
    <ImageBackground source={require("../../../assets/images/bg-signup.png")} resizeMode="cover" className="flex-1">
      <View className="flex-1 px-6">
        <View className="mt-8">
          <ActionIcon
            icon={<ArrowLeft size="28" color="#dff2eb" variant="Outline" />}
            backgroundColor="bg-[#4A628A]"
            onPress={() => router.back()}
          />
          <Text className="text-[20px] text-center font-unbounded">Create Account</Text>
        </View>

        <Text className="text-[14px] font-unbounded-light text-center mt-4">
          Fill your information or register with {"\n"} your social account
        </Text>

        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={SignUpSchema}
          onSubmit={handleRegister}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              {/* Input Username */}
              <View className="mt-8">
                <Text className="text-[14px] font-unbounded-light mb-3">Username</Text>
                <TextInput
                  className="bg-[#DFF2EB] rounded-2xl px-4 py-4 font-unbounded-light"
                  placeholder="Enter your username"
                  placeholderTextColor="#A9A9A9"
                  textAlignVertical="center"
                  numberOfLines={1}
                  maxLength={50}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
                {errors.username && touched.username && (
                  <Text className="font font-unbounded-light text-[12px] text-red-500 ml-6">{errors.username}</Text>
                )}
              </View>

              {/* Input Email */}
              <View className="mt-8">
                <Text className="text-[14px] font-unbounded-light mb-3">Email</Text>
                <TextInput
                  className="bg-[#DFF2EB] rounded-2xl px-4 py-4 font-unbounded-light"
                  placeholder="Enter your email"
                  placeholderTextColor="#A9A9A9"
                  textAlignVertical="center"
                  numberOfLines={1}
                  maxLength={50}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Text className="font font-unbounded-light text-[12px] text-red-500 ml-6">{errors.email}</Text>
                )}
              </View>

              {/* Input Password */}
              <View className="mt-8">
                <Text className="text-[14px] font-unbounded-light mb-3">Password</Text>
                <View className="flex-row items-center bg-[#DFF2EB] rounded-2xl px-4">
                  <TextInput
                    className="flex-1 font-unbounded-light py-4"
                    placeholder="Enter your password"
                    placeholderTextColor="#A9A9A9"
                    textAlignVertical="center"
                    numberOfLines={1}
                    secureTextEntry={!passwordVisible}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} className="px-2">
                    <Text className="text-[14px] font-unbounded-light">
                      {passwordVisible ? (
                        <EyeSlash size="20" color="#000000" variant="Bold" />
                      ) : (
                        <Eye size="20" color="#000000" variant="Bold" />
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.password && touched.password && (
                  <Text className="font font-unbounded-light text-[12px] text-red-500 ml-6">{errors.password}</Text>
                )}
              </View>

              {/* Checkbox */}
              <View className="flex-row items-center mt-6 ml-4">
                <TouchableOpacity
                  onPress={() => setIsChecked(!isChecked)}
                  className={`size-6 rounded-md border-2 ${isChecked ? "border-[#4A628A]" : "border-[#4A628A]"}`}
                >
                  {isChecked && <Image source={require("../../../assets/icons/tick-square.png")} />}
                </TouchableOpacity>
                <Text className="ml-3 font-unbounded text-[13px]">
                  Agree with <Text className="font-unbounded-light underline">Term & Condition</Text>
                </Text>
              </View>

              {/* Sign Up button */}
              <View className="mt-8">
                {isLoading ? (
                  <ActivityIndicator size="large" color="#4A628A" />
                ) : (
                  <Button title="Sign Up" backgroundColor="bg-[#4A628A]" onPress={() => handleSubmit()} />
                )}
              </View>
            </>
          )}
        </Formik>
      </View>
    </ImageBackground>
  );
};

export default SignUp;
