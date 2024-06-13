import React, { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import FooterNav from "../../../components/main/footer";
import Header from "../../../components/main/header";
import ChatCard from "../../../components/chatCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const user_no = jwtDecode(userToken).no;

  //채팅방 정보 불러오기
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5001/chat/chatlist",
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          },
        );

        setChats(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("데이터를 불러오는데 오류가 발생했습니다.", err);
      }
    };
    if (userToken) {
      fetchChats();
    }
  }, [userToken]);

  return (
    <div style={{ paddingTop: 80, paddingBottom: 50 }}>
      <Header />
      <Container>
        <Grid container spacing={2}>
          {chats.map((chat, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ChatCard chat={chat} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <FooterNav />
    </div>
  );
};

export default Chat;
