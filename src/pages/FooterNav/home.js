import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import Footer from "../../components/main/footer";
import Header from "../../components/main/header";
import { Container, Grid, Button } from "@mui/material";
import Postcard from "../../components/post/postcard";
import { indigo } from "@mui/material/colors";
import axios from "axios";

//테스트용 임시 데이터
import Posts from "../../data";

const Home = () => {
  const [posts, setPosts] = useState(Posts); // 샘플 데이터로 초기화
  const [visibleCount, setVisibleCount] = useState(6); // 초기에 표시할 포스트 수
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const categories = [
    "전체",
    "의류",
    "도서",
    "전자제품",
    "화장품",
    "생필품",
    "기프티콘",
    "대리예매",
    "계정대여",
    "기타",
  ];
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // 선택된 카테고리에 따라 게시물 필터링
  const visiblePosts = posts.filter(
    (post) =>
      post.status !== 2 &&
      (selectedCategory === "전체" || post.category === selectedCategory)
  );

  const loadMorePosts = () => {
    setVisibleCount((prevVisibleCount) => prevVisibleCount + 3); // 3개씩 더 불러오기
  };
  return (
    <div style={{ paddingTop: 50 }}>
      <Header />
      <Container style={{ paddingTop: "5%", paddingBottom: "20%" }}>
        <Container
          style={{
            overflow: "auto",
            whiteSpace: "nowrap",
            padding: 1,
            marginTop: 10,
          }}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "contained" : "outlined"}
              onClick={() => handleCategoryClick(category)}
              sx={{
                mx: 0.5,
                my: 1,
                backgroundColor:
                  selectedCategory === category ? indigo[500] : null,
              }}
            >
              {category}
            </Button>
          ))}
        </Container>
        <Grid container spacing={2}>
          {visiblePosts.slice(0, visibleCount).map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4}>
              <Postcard post={post} />
            </Grid>
          ))}
        </Grid>
        {visibleCount < visiblePosts.length && (
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            onClick={loadMorePosts}
            size="large"
            sx={{
              mt: 2,
              margin: "20px auto",
              display: "block",
              "&:hover": {
                backgroundColor: indigo[500],
              },
            }}
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
