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
  Toolbar,
} from "@mui/material";
import { ChatBubbleRounded, FavoriteRounded } from "@mui/icons-material";

//확인용 나중에 지우기
import Posts from "../../data";

const PostFooter = ({ post }) => {
  //console.log("footer recived: ", postProp);
  const { post_no } = useParams(); //현재 페이지 URL에서 no 파라미터 추출
  //const [liked, setLiked] = useState(null);
  const [likeStatus, setLikeStatus] = useState(false);
  const [chatCount, setChatCount] = useState(0);
  const navigate = useNavigate();
  //const [post, setPost] = useState("");
  //const userToken = useState(localStorage.getItem("userToken"));
  // 나중에 지울 데이터
  localStorage.setItem("userToken", 1);
  localStorage.setItem("userNickname", "채팅테스트User");
  const userToken = useState(localStorage.getItem("useToken"));
  const userNickname = useState(localStorage.getItem("userNickname"));
  ///console.log("로컬스토리지 테스트 : ", userToken, userNickname);

  /* 사용자 찜 정보 가져오기
  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/status_like/${post_no}/${userToken}`,
        );
        setLikeStatus(response.data.liked);
      } catch (err) {
        console.error(" 좋아요 통신중 오류 발생", err);
      }
    };
    checkLikeStatus();
  }, [post_no, userToken]);*/

  const handleChatClick = async () => {
    if (post.status === 2) return; // 거래완료 시 채팅불가
    navigate(`/chatRoom/${post_no}`, { state: { post } }); // post 정보 같이 보내기 // state로 post 객체 전달
    setChatCount((prev) => prev + 1);
  };

  const handleLikeClick = async () => {
    try {
      if (likeStatus) {
        await axios.post(`http://localhost:5001/post/dislike_post/${post_no}`, {
          user_no: userToken,
        });
        setLikeStatus(false);
        console.log("안좋아요");
      } else {
        await axios.post(`http://localhost:5001/post/like_post/${post_no}`, {
          user_no: userToken,
        });
        setLikeStatus(true);
        console.log("좋아요");
      }
    } catch (err) {
      console.log("좋아요 통신중 오류 발생", err);
    }
  };

  /*
  /*나중에 수정하기 완전 이상,, + 이미 채팅을 한 번 한 사람이면 채팅 수 증가 막기
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
      <Toolbar
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
            <IconButton
              onClick={handleLikeClick}
              disabled={post.post_status === 2}
            >
              <FavoriteRounded
                color={likeStatus ? "error" : "inherit"}
                style={{ fontSize: "30px" }}
              />
            </IconButton>
            <Divider
              orientation="vertical"
              flexItem
              variant="large"
              sx={{ mx: 1.5, opacity: 1 }}
            />
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
              {post.post_price}원
            </Typography>
          </Grid>
          <Grid item sx={{ p: 3 }}>
            <Button
              startIcon={<ChatBubbleRounded color="secondary.light" />}
              onClick={handleChatClick}
              variant="contained"
              disabled={post.post_status === 2}
            >
              채팅하기
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </footer>
  );
};

export default PostFooter;
