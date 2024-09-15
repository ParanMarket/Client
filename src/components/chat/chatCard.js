import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CardActionArea,
  Box,
  Badge,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChatCard = ({ chat }) => {
  const navigate = useNavigate();
  const [post, setPost] = useState("");
  const post_no = chat.post_no;
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/post/get_post/${post_no}`,
        );
        const postData = response.data[0];
        setPost(postData);
      } catch (err) {
        console.log("데이터를 가져오는데 실패하였습니다.");
      }
    };
    fetchPostData();
  }, [post_no]);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/chat/unread/${chat.user_no}`,
        );
        const unreadData = response.data.find(
          (c) => c.chat_no === chat.chat_no,
        );
        setUnread(unreadData ? unreadData.unread_count : 0);
      } catch (error) {
        console.log("안읽음 뱃지 처리 오류", error);
      }
    };
    fetchUnread();
  }, []);

  const handleCardClick = () => {
    navigate(`chatRoom/${chat.chat_no}`, { state: { post } }); // 각 채팅방으로 이동하기
  };

  // 채팅을 보낸 시점 띄우는 함수
  const chatTime = (chatTime) => {
    const chatDate = new Date(chatTime);
    const today = new Date();

    // 채팅을 보낸 시점이 오늘인지 판단
    const isToday =
      chatDate.getDate() === today.getDate() &&
      chatDate.getMonth() === today.getMonth() &&
      chatDate.getFullYear() === today.getFullYear();

    // 채팅을 보낸 시점이 오늘이면 시:분 표시
    return isToday
      ? chatDate.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
      : chatDate.toLocaleDateString();
  };

  return (
    <Card
      sx={{
        display: "flex",
        height: 140,
        maxWidth: "1000px",
        position: "relative",
        "&:hover": {
          backgroundColor: indigo[50],
        },
      }}
    >
      <CardActionArea
        onClick={handleCardClick}
        sx={{ display: "flex", width: "100%" }}
      >
        <Box
          sx={{ position: "relative", width: 120, height: 120, margin: "3%" }}
        >
          <CardMedia
            component="img"
            sx={{ width: "120px", height: "120px", borderRadius: 2 }}
            image={chat.post_img || "https://via.placeholder.com/140"}
            alt={chat.post_title}
          />
        </Box>
        <CardContent
          sx={{ flexGrow: 1, overflow: "hidden", pr: 3, maxWidth: "65%" }}
        >
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            height="100%"
          >
            <Grid item container flexDirection="column">
              <Typography variant="h6" component="div">
                {chat.post_title}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                {chatTime(chat.chat_time)}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
                maxWidth="100%"
              >
                {chat.chat_content}
              </Typography>
              <Typography variant="subtitle2" component="div" noWrap>
                {chat.chat_sender_nick}
              </Typography>
            </Grid>
            <Badge
              badgeContent={unread}
              color="error"
              sx={{ position: "absolute", top: 10, right: 10 }}
            />
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ChatCard;
