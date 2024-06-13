import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  CardActionArea,
  Box,
  Button,
} from "@mui/material";
import { Favorite, Chat, MoreVert, GppMaybeRounded } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";
import blurBox from "../css/blurBox";
import axios from "axios";

const ChatRoomcard = ({ post }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [checkUser, setCheckUser] = useState(false);
  const [postOwner, setPostOwner] = useState("");
  const [statusEnd, setStatusEnd] = useState(false);

  useEffect(() => {
    setPostOwner(post.post_user_no);

    const verifyUser = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5001/auth/verify_user",
          { post_user_no: postOwner },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          },
        );

        if (response.data.verified) {
          setCheckUser(true);
        } else {
          setCheckUser(false);
        }
      } catch (error) {
        console.error("통신 오류 사용자 인증 실패", error);
        setCheckUser(false);
      }
    };
    verifyUser();
  }, [post, userToken]);

  // 거래완료 버튼
  const handleCompleteTransaction = () => {
    alert("거래 완료 처리를 하시겠습니까?");
    setStatusEnd(true);
    console.log("거래 완료 처리");
  };

  // 경찰청 사기 조회 사이트
  const handleCheckCheat = () => {
    window.location.href =
      "https://www.police.go.kr/www/security/cyber/cyber04.jsp"; // 경찰청 사기조회 사이트
  };

  const handleCardClick = () => {
    navigate(`/post/${post.post_no}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        height: 140,
        position: "relative",
        "&:hover": {
          backgroundColor: indigo[50],
        },
      }}
    >
      <CardActionArea
        onClick={handleCardClick}
        sx={{ display: "flex", width: "90%" }}
      >
        <Box
          sx={{ position: "relative", width: 120, height: 120, margin: "3%" }}
        >
          <CardMedia
            component="img"
            sx={{ width: "100%", height: "100%", borderRadius: 2 }}
            image={post.post_img || "https://via.placeholder.com/140"}
            alt={post.post_title}
          />
          {(statusEnd || post.post_status == 2) && (
            <Box sx={blurBox}>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                거래완료
              </Typography>
            </Box>
          )}
        </Box>
        <CardContent sx={{ flexGrow: 1, overflow: "hidden", pr: 3 }}>
          <Typography variant="button" component="div" color="primary">
            {post.post_type === 0 ? "팔아요" : "구해요"}
          </Typography>
          <Typography variant="subtitle1" component="div">
            {post.post_title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {post.post_price}원
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {new Date(post.post_sdd).toLocaleDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          pr: 1,
          pt: 1,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleCheckCheat}
          sx={{ mt: 1, width: "130px", height: "50px" }}
        >
          <GppMaybeRounded sx={{ mr: 1 }} />
          <Typography variant="body2">사기조회</Typography>
        </Button>
        {postOwner && (
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleCompleteTransaction}
            sx={{ mt: 1, width: "130px", height: "50px" }}
          >
            거래 완료
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default ChatRoomcard;
