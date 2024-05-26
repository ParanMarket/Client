import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import Footer from "../../components/footer";
import Header from "../../components/header";
import { Container, Grid, Button } from "@mui/material";
import Postcard from "../../components/postcard";
import { indigo } from "@mui/material/colors";
import axios from "axios";

//테스트용 임시 데이터
import Posts from "../../data";

const Home = () => {
  const [posts, setPosts] = useState(Posts); // 샘플 데이터로 초기화
  const [visibleCount, setVisibleCount] = useState(6); // 초기에 표시할 포스트 수

  const loadMorePosts = () => {
    setVisibleCount((prevVisibleCount) => prevVisibleCount + 3); // 3개씩 더 불러오기
  };

  return (
    <div style={{ paddingTop: 50 }}>
      <Header />
      <Container style={{ paddingTop: "5%", paddingBottom: "20%" }}>
        <Grid container spacing={2}>
          {posts.slice(0, visibleCount).map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4}>
              <Postcard post={post} />
            </Grid>
          ))}
        </Grid>
        {visibleCount < posts.length && (
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            onClick={loadMorePosts}
            size="large"
            sx={{
              mt: 2,
              "&:hover": {
                backgroundColor: indigo[500],
              },
            }}
            style={{ margin: "20px auto", display: "block" }}
          >
            더보기
          </Button>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
