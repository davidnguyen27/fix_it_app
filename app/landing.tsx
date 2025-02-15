import React, { useEffect } from "react";
import { View, Text, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshTokens } from "../services/auth.service"; 

const LoadingScreen = () => {
  useEffect(() => {
    const getTokens = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("AccessToken");
        const refreshToken = await AsyncStorage.getItem("RefreshToken");
      
        if (accessToken && refreshToken) {
          const response = await refreshTokens(accessToken, refreshToken); 
          await AsyncStorage.setItem("AccessToken", response.AccessToken);
          await AsyncStorage.setItem("RefreshToken", response.RefreshToken);
        }
      } catch (error) {
        console.error("❌ Lỗi khi refresh token:", error);
      }
    };

    getTokens();
  }, []);

  return (
    <ImageBackground
    source={require("../assets/images/landing.png")}
    resizeMode="cover"
    style={{ flex: 1 }} // Chắc chắn phần nền phủ hết màn hình
  >
    <View
      style={{
        position: "absolute",
        bottom: 40,  // Tăng khoảng cách từ dưới
        left: 16,    // Giảm khoảng cách từ trái
        right: 16,   // Giảm khoảng cách từ phải
        borderRadius: 24, // Tăng độ bo góc để nhìn mềm mại hơn
        padding: 20, // Padding rộng hơn để các phần tử không quá sát nhau
        backgroundColor: "rgba(74, 98, 138, 0.72)", // Giữ màu nền nhưng mờ hơn để dễ nhìn
        justifyContent: "center", // Đảm bảo căn giữa
        alignItems: "center", // Căn giữa nội dung
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 24, // Tăng kích thước chữ để dễ nhìn hơn
          fontFamily: "Unbounded-SemiBold", // Phông chữ nổi bật hơn
          textAlign: "center", // Căn giữa
          lineHeight: 32, // Tăng khoảng cách giữa các dòng
          letterSpacing: 0.5, // Thêm khoảng cách giữa các chữ
        }}
      >
        Convenient Repairs {"\n"} Dedicated Service
      </Text>
    </View>
  </ImageBackground>
  );
};

export default LoadingScreen;
