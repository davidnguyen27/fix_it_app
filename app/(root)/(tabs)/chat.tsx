import { ArrowLeft, Send2, AttachSquare } from "iconsax-react-native";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from "react-native";
import ActionIcon from "@/components/ActionIcon";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

interface Message {
  id: string;
  text: string;
  time: string;
  user: string;
  avatar: string;
  isSender: boolean;
}

const messages: Message[] = [
  {
    id: "1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    time: "11:11 pm",
    user: "NV Nguyễn Trọng Khoa",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    isSender: false,
  },
  {
    id: "2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    time: "11:11 pm",
    user: "Trần Quang Trí",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    isSender: true,
  },
];

const Chat = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState("");

  const renderMessage = ({ item }: { item: Message }) => (
    <View className={`mb-4 ${item.isSender ? "items-end" : "items-start"}`}>
      {/* Nội dung tin nhắn */}
      <View className={`flex-row items-center ${item.isSender ? "justify-end" : "justify-start"} mb-4`}>
        {!item.isSender && <Image source={{ uri: item.avatar }} className="size-8 rounded-full mr-2" />}
        <View className={`p-3 rounded-[10px] max-w-[75%] ${item.isSender ? "bg-[#4A628A]" : "bg-white"}`}>
          <Text className={`text-[12px] font-unbounded ${item.isSender ? "text-white" : "text-black"}`}>
            {item.text}
          </Text>
        </View>
      </View>

      {/* Thời gian và tên người gửi */}
      <View className={`flex-row items-center mt-1 ${item.isSender ? "justify-end" : "justify-start"}`}>
        {item.isSender && <Text className="text-[10px] font-unbounded-medium mr-2">{item.time}</Text>}
        {!item.isSender && <Text className="text-[10px] font-unbounded-medium">{item.user}</Text>}
        {!item.isSender && <Text className="text-[10px] font-unbounded-medium ml-2">{item.time}</Text>}
        {item.isSender && <Image source={{ uri: item.avatar }} className="size-8 rounded-full ml-2" />}
      </View>
    </View>
  );

  return (
    <LinearGradient colors={["#E9F3F1", "#4A628A"]} locations={[0.0, 1.0]} className="flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 mt-8">
        <ActionIcon
          icon={<ArrowLeft size="24" color="#DFF2EB" variant="Outline" />}
          backgroundColor="bg-[#4A628A]"
          onPress={() => router.back()}
        />
        <View className="flex-row items-center">
          <View className="ml-3">
            <Text className="text-[14px] font-unbounded-medium">Nguyễn Trọng Khoa</Text>
            <Text className="text-[11px] font-unbounded-light">
              <Text className="text-[#08F600]">●</Text> Online
            </Text>
          </View>
        </View>
        <ActionIcon
          icon={<Feather name="more-vertical" size={24} color="#DFF2EB" />}
          backgroundColor="bg-[#4A628A]"
          onPress={() => console.log("Back pressed")}
        />
      </View>
      <View className="absolute h-[740px] bottom-0 left-0 right-0 bg-[#EEEEEE] rounded-t-[30px] px-6 py-4">
        <Text className="text-center font-unbounded text-[15px] my-4 tracking-[3px]">TODAY</Text>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        />

        <View className="absolute bottom-6 left-4 right-4 flex-row items-center bg-[#D9D9D9] rounded-[5px] p-3">
          <TouchableOpacity className="bg-white p-2 rounded-lg">
            <AttachSquare size="24" color="#4A628A" variant="Bold" />
          </TouchableOpacity>
          <TextInput
            className="flex-1 ml-3 text-[10px] font-unbounded"
            placeholder="Type a message here..."
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity className="bg-[#4A628A] p-2 rounded-lg">
            <Send2 size="20" color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Chat;
