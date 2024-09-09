import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import PostFooter from "../../../components/post/postFooter";
import PostHeader from "../../../components/post/postHeader";
import {
  Box,
  Typography,
  Divider,
  Avatar,
  IconButton,
  Grid,
} from "@mui/material";
import moment from "moment"; // 시간 계산
import "slick-carousel/slick/slick.css"; // 이미지 여러개 일 때 슬라이드
import "slick-carousel/slick/slick-theme.css";
import blurImg from "../../../css/blurImg";
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";

const PostDetail = () => {
  const { post_no } = useParams();
  const [post, setPost] = useState(null);
  const [grade, setGrade] = useState("");
  const [postImages, setPostImages] = useState([]);
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        console.log(post_no);
        const response = await axios.get(
          `http://localhost:5001/post/get_post/${post_no}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          },
        );
        const postData = response.data[0];
        setPost(postData);
        console.log(postData);

        // 등급 설정
        if (postData.user_grade === 0) {
          setGrade("첫눈");
        } else if (postData.user_grade === 1) {
          setGrade("함박눈");
        } else {
          setGrade("만년설");
        }
        // 초기 설정
      } catch (err) {
        console.log("데이터를 가져오는데 실패하였습니다.");
      }
    };
    fetchPostData();
  }, [post_no]);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/post/get_post_img/${post_no}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          },
        );
        const postImageData = response.data;
        setPostImages(postImageData);
        console.log(postImages);
      } catch (err) {
        console.log("데이터를 가져오는데 실패하였습니다.", err);
      }
    };
    fetchImageData();
  }, [post_no]);

  if (!post) return <div>Loading...</div>; //없으면 로딩임

  // 이미지 슬라이더 세팅
  const slider_setting = {
    dots: postImages.length > 1,
    infinite: postImages.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // 업로드 시간 계산 (현재시간으로부터 ~)
  const uploadedTime = moment(post.post_sdd).fromNow();
  //console.log(uploadedTime);

  // 닉네임의 첫 글자 추출
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <div style={{ paddingBottom: 100 }}>
      <PostHeader post={post} />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "400px",
            maxHeight: "400px",
            margin: "0 auto",
            overflow: "show",
          }}
        >
          {/* 이미지 슬라이더 */}
          <Box>
            <Slider {...slider_setting}>
              {postImages.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.post_img}
                    alt={`Post image ${index + 1}`}
                    style={{
                      width: "90%",
                      display: "block",
                      maxHeight: "380px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </Slider>
          </Box>
          {post.post_status === 2 && (
            <Box sx={blurImg}>
              <Typography variant="h6" component="div" sx={{ color: "white" }}>
                거래완료
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        {/* 사용자 정보 => 사용자 개인 프로필 볼 수 있도록 나중에 설정하기*/}
        <Box
          backgroundColor="white"
          border="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Avatar src={post.user_img} alt={post.user_nick}>
            {!post.user_avatar && getInitial(post.user_nick)}
          </Avatar>
          <Box sx={{ backgroundColor: "white", ml: 3 }}>
            <Typography variant="subtitle1" color="black">
              {post.user_nick}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {grade}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        {/* 포스트 정보 */}
        {post.post_status === 1 && (
          <Typography variant="h6" component="div" color="primary">
            거래중
          </Typography>
        )}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {post.post_title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {post.post_comment}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          {uploadedTime}
        </Typography>
      </Box>
      <div>
        <PostFooter post={post} />
      </div>
    </div>
  );
};

export default PostDetail;
