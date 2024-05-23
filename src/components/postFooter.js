import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  BottomNavigation,
  Divider,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { ChatBubbleRounded, FavoriteRounded } from "@mui/icons-material";

//확인용 나중에 지우기
import Posts from "../data";

const PostFooter = () => {
  const { no } = useParams(); //현재 페이지 URL에서 no 파라미터 추출
  const [liked, setLiked] = useState(null);
  const [chatCount, setChatCount] = useState(0);
  const navigate = useNavigate();
  const [post, setPost] = useState("");
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));

  // post_no에 따른 post정보 가져오기
  useEffect(() => {
    const foundPost = Posts.find((post) => post.no.toString() === no); // 데이터를 문자열 no와 비교
    if (foundPost) {
      setPost(foundPost);
    } else {
      console.error("정보를 가지고 오는데 실패했습니다.");
    }
  }, [no]);

  useEffect(() => {
    console.log(liked); // 상태 변경 확인
  }, [liked]);
  const handleLikeClick = async () => {
    const newLikeState = liked ? null : 1; //좋아요 선택되면 1 아님 null
    setLiked(newLikeState);
  };

  const handleChatClick = async () => {
    if (post.status === 2) return; // 거래완료 시 채팅불가
    const chatRoomNo = `chat-${no}`; // eg 아이디

    navigate(`/chatRoom/${chatRoomNo}`, { state: { postNo: no } }); // 나중에 내 토큰(아이디) & 올린 사람 아이디 & 상품번호 넣어서 챗룸 만들기
    setChatCount((prev) => prev + 1);
  };

  /*
  const fetchPost = async () => {
    try {
      const response = await axios.get("localohost:5000/post/${no}");
      setPost(response.data);
    } catch (err) {
      console.error("정보를 가지고 오는데 실패했습니다.", err);
    }
  };

  const handleLikeClick = async () => {
    const newLikeState = liked ? null : 1; //좋아요 선택되면 1 아님 null
    setLiked(newLikeState);
    try {
      await axios.post(`localhost:5000/post/${no}/like`, {
        liked: newLikeState,
      });
    } catch (err) {
      console.error("좋아요를 db에 반영하는데 실패했습니다.", err);
    }
  };

  //나중에 수정하기 완전 이상,, + 이미 채팅을 한 번 한 사람이면 채팅 수 증가 막기
  const handleChatClick = async () => {
    if (post.status === 2) return; // 거래완료 시 채팅불가
    const chatRoomId = `chat-${no}-${userToken}`; // eg 아이디

    navigate(`/chatRoom/${chatRoomId}`, { state: { userToken, postNo: no } }); // 나중에 내 토큰(아이디) & 올린 사람 아이디 & 상품번호 넣어서 챗룸 만들기
    setChatCount((prev) => prev + 1);
    /*
    try {
      console.log(chatCount);
      await axios.post(`localhost:5000/post/${no}/chatNum`, { chatCount });
    } catch (err) {
      console.error("채팅방 수 db저장에 실패했습니다.", err);
    }
    */

  return (
    <footer>
      <BottomNavigation
        sx={{
          width: "100%",
          height: "12%",
          position: "fixed",
          bottom: 0,
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid
            item
            sx={{ display: "flex", alignItems: "center", marginLeft: 2 }}
          >
            <IconButton onClick={handleLikeClick} disabled={post.status === 2}>
              <FavoriteRounded
                color={liked ? "error" : "inherit"}
                style={{ fontSize: "30" }}
              />
            </IconButton>
            <Divider
              orientation="vertical"
              flexItem
              variant="large"
              sx={{ mx: 1.5, opacity: 1 }}
            />
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
              {post.price}원
            </Typography>
          </Grid>
          <Grid item sx={{ p: 3 }}>
            <Button
              startIcon={<ChatBubbleRounded color="secondary.light" />}
              onClick={handleChatClick}
              variant="contained"
              disabled={post.status === 2}
            >
              채팅하기
            </Button>
          </Grid>
        </Grid>
      </BottomNavigation>
    </footer>
  );
};

export default PostFooter;
