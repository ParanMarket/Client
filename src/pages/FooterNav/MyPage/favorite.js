import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, CircularProgress, Typography } from "@mui/material";
import Footer from "../../../components/main/footer";
import Header from "../../../components/myPage/myPageHeader";
import Postcard from "../../../components/post/postcard";

//테스트용 임시 데이터
import Posts from "../../../data";

const Favorite = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 사용자 좋아요 정보 가져오기
  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/liked", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("좋아요 정보를 가져오는데 실패했습니다.", err);
        /* 나중에 주석 지우기 setLoading(true);*/
        //나중에 지우기 임시데이터
        const likedPosts = Posts.filter((post) => post.liked);
        setLoading(false);
        setPosts(likedPosts);
      }
    };
    fetchLikedPosts();
  }, []);

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "30vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (!posts.length) {
    return (
      <Typography variant="h5" align="center">
        좋아요를 한 게시물이 없습니다.
      </Typography>
    );
  }
  return (
    <div>
      <Header title="찜목록" />

      <Container style={{ paddingTop: "5%", paddingBottom: "20%" }}>
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4}>
              <Postcard post={post} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Favorite;
