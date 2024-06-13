import React, { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import FooterNav from "../../../components/main/footer";
import Header from "../../../components/main/header";
import ChatCard from "../../../components/chatCard";

const Chat = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // 여기서 실제 데이터 로드 로직을 수행할 수 있습니다.
    // 예제 데이터를 사용합니다.
    const exampleChats = [
      {
        // 대표 이미지 (상품 사진 추가)
        post_title: "상품 1", // post_title
        user_nick: "사용자 1", // 판매자 이름 user_nick/no
        lastMessage: "안녕하세요, 상품 아직 있나요?",
        unread: true,
        lastMessageTime: "2023-06-12T14:48:00.000Z",
        itemImage: "https://via.placeholder.com/140", // 상품 이미지 URL
      },
      {
        post_title: "상품 2",
        user_nick: "사용자 2",
        lastMessage: "네, 아직 있습니다.",
        unread: false,
        lastMessageTime: "2023-06-10T10:15:00.000Z",
        itemImage: "https://via.placeholder.com/140", // 상품 이미지 URL
      },
      {
        post_title: "상품 2",
        user_nick: "사용자 2",
        lastMessage: "네, 아직 있습니다.",
        unread: false,
        lastMessageTime: "2023-06-10T10:15:00.000Z",
        itemImage: "https://via.placeholder.com/140", // 상품 이미지 URL
      },
      // 추가 채팅 데이터...
    ];

    setChats(exampleChats);
  }, []);

  const handleCardClick = (chat) => {
    // 카드 클릭 핸들러 로직 추가
    console.log("Chat clicked:", chat);
  };

  return (
    <div style={{ paddingTop: 80, paddingBottom: 50 }}>
      <Header />
      <Container>
        <Grid container spacing={2}>
          {chats.map((chat, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ChatCard
                chat={chat}
                handleCardClick={() => handleCardClick(chat)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <FooterNav />
    </div>
  );
};

export default Chat;
