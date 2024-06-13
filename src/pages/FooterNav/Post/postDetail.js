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

const PostDetail = () => {
  const { post_no } = useParams();
  const [post, setPost] = useState(null);
  const [grade, setGrade] = useState("");
  const [postImages, setPostImages] = useState([]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/post/get_post/${post_no}`,
        );
        const postData = response.data[0];
        setPost(postData);
        //console.log(postData);

        // 등급 설정
        if (postData.user_grade === 0) {
          setGrade("첫눈");
        } else if (postData.user_grade === 1) {
          setGrade("함박눈");
        } else {
          setGrade("만년설");
        }

        // 사진 설정
        setPostImages(postData.post_images);
        // 초기 좋아요 설정
      } catch (err) {
        console.log("데이터를 가져오는데 실패하였습니다.");
      }
    };
    fetchPostData();
  }, [post_no]);

  if (!post) return <div>Loading...</div>; //없으면 로딩임

  // // 이미지 슬라이더 세팅
  // const slider_setting = {
  //     dots: post.post_img.length > 1,
  //     infinite: post.post_img.length > 1,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     arrows: false,
  // };

  // 업로드 시간 계산 (현재시간으로부터 ~)
  const uploadedTime = moment(post.post_sdd).fromNow();
  //console.log(uploadedTime);

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
        {/*    /!* 이미지 슬라이더 *!/*/}
        {/*    <Slider {...slider_setting}>*/}
        {/*    {postImages.map((imageUrl, index) => (*/}
        {/*        <div key={index}>*/}
        {/*            <img*/}
        {/*                src={imageUrl}*/}
        {/*                alt={`Post image ${index + 1}`}*/}
        {/*                style={{ width: "100%", display: "block" }}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*    ))}*/}
        {/*</Slider>*/}
        {post.post_status === 2 && (
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
          <Avatar src={post.user_img} alt={post.user_nick} />
          <Box sx={{ ml: 1 }}>
            <Typography variant="subtitle1">{post.user_nick}</Typography>
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
