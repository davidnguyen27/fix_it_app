import ActionIcon from "@/components/ActionIcon";
import Button from "@/components/Button";
import icons from "@/constants/icons";

import useUser from "@/hooks/useUser";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";

// Modal component to show after successful registration
import { Modal, StyleSheet } from "react-native";

const SignUp = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { signUp, isModalVisible, handleModalClose } = useUser();  // Using modal state from useUser hook

  const handleRegister = () => {
    signUp(username, email, password);
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/bg-signup.png")}
      resizeMode="cover"
      className="flex-1"
    >
      <ScrollView className="flex-1 px-6">
        <View className="mt-8">
          <ActionIcon
            icon={icons.arrowLeft}
            backgroundColor="bg-[#4A628A]"
            tintColor="#DFF2EB"
            onPress={() => router.back()}
          />
          <Text className="text-[20px] text-center font-unbounded">Create Account</Text>
        </View>

        <Text className="text-[14px] font-unbounded-light text-center mt-4">
          Fill your information or register with {"\n"} your social account
        </Text>

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
            value={username}
            onChangeText={setUsername}
          />
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
            value={email}
            onChangeText={setEmail}
          />
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
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} className="px-2">
              <Text className="text-[14px] font-unbounded-light">
                <Image source={passwordVisible ? icons.eyeOff : icons.eyeOn} className="size-6" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Checkbox */}
        <View className="flex-row items-center mt-6 ml-4">
          <TouchableOpacity
            onPress={() => setIsChecked(!isChecked)}
            className={`size-6 rounded-md border-2 ${isChecked ? "border-[#4A628A]" : "border-[#4A628A]"}`}
          >
            {isChecked && <Image source={icons.tickSquare} />}
          </TouchableOpacity>
          <Text className="ml-3 font-unbounded text-[13px]">
            Agree with <Text className="font-unbounded-light underline">Term & Condition</Text>
          </Text>
        </View>

        {/* Sign Up button */}
        <View className="mt-8">
            <Button title="Sign Up" backgroundColor="bg-[#4A628A]" onPress={handleRegister} />
        </View>

        {/* Modal when registration is successful */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={handleModalClose}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                Check your email to activate your account.
                </Text>
              <Button title="Close" backgroundColor="bg-[#4A628A]" onPress={handleModalClose} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 350,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
    textAlign: "center",
  },
});

export default SignUp;
