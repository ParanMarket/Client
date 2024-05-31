import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import PostFooter from "../../../components/post/postFooter";
import PostHeader from "../../../components/post/postHeader";
import { Box, Typography, Divider, Avatar, IconButton } from "@mui/material";
import moment from "moment"; // 시간 계산
import "slick-carousel/slick/slick.css"; // 이미지 여러개 일 때 슬라이드
import "slick-carousel/slick/slick-theme.css";
import blurImg from "../../../css/blurImg";

//테스트용 임시 데이터
import Posts from "../../../data";

const PostDetail = () => {
  const { no } = useParams();
  const [post, setPost] = useState(null);

  // 나중에 데이터 가져 올 수 있도록 하기
  // useEffect(() => {
  //   axios
  //     .get(`https://localhost:5001/posts/${id}`)
  //     .then((response) => {
  //       setPost(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching post", error);
  //     });
  // }, [id]);

  useEffect(() => {
    const postNo = parseInt(no, 10); // 정수 변환 숫자처리(10진수)
    const foundPost = Posts.find((p) => p.no === postNo); // 데이터 배열에서 해당 no 가진 포스트 찾기

    if (foundPost) {
      setPost(foundPost);
    } else {
      console.error("Post not found");
    }
  }, [no]);

  if (!post) return <div>Loading...</div>; //없으면 로딩임

  // 이미지 슬라이더 세팅
  const slider_setting = {
    dots: post.images.length > 1,
    infinite: post.images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // 업로드 시간 계산 (현재시간으로부터 ~)
  const uploadedTime = moment(post.sdd).fromNow();
  console.log(uploadedTime);

  return (
    <div style={{ paddingBottom: 100 }}>
      <PostHeader post={post} />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          overflow: "show",
        }}
      >
        {/* 이미지 슬라이더 */}
        <Slider {...slider_setting}>
          {post.images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Post image ${index + 1}`}
                style={{ width: "100%", display: "block" }}
              />
            </div>
          ))}
        </Slider>
        {post.status === 2 && (
          <Box sx={blurImg}>
            <Typography variant="h6" component="div" sx={{ color: "white" }}>
              거래완료
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ p: 2 }}>
        {/* 사용자 정보 => 사용자 개인 프로필 볼 수 있도록 나중에 설정하기*/}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src={post.user.image} alt={post.user.name} />
          <Box sx={{ ml: 1 }}>
            <Typography variant="subtitle1">{post.user.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {post.user.grade}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        {/* 포스트 정보 */}
        {post.status === 1 && (
          <Typography variant="h6" component="div" color="primary">
            거래중
          </Typography>
        )}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {post.title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {post.comment}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          {uploadedTime}
        </Typography>
      </Box>
      <PostFooter post={post} />
    </div>
  );
};

export default PostDetail;
