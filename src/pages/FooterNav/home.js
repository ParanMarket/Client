import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/main/footer";
import Header from "../../components/main/header";
import { Container, Button } from "@mui/material";
import { indigo } from "@mui/material/colors";
import axios from "axios";
import { useInView } from "react-intersection-observer"; // 무한스크롤
import PostCard from "../../components/post/postcard";
import { Grid } from "@mui/material/";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  // 데이터 요청시에만 불러오고 이전 데이터 아래 새 데이터 추가
  const fetchPosts = async (page, append = false) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/post/post_list/${page}`,
      );
      if (response.data.length === 0) {
        setHasMore(false); // 데이터가 더이상 없으면 false
      } else {
        setPosts((prevPosts) =>
          append ? [...prevPosts, ...response.data] : response.data,
        );
      }
    } catch (err) {
      console.error("Error fetching posts", err);
    }
  };

  // 카테고리 선택에 해당하는 데이터 불러오기
  const fetchCategoryPosts = async (cate) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/post/post_cate_list/${cate}`,
      );
      setPosts(response.data);
    } catch (err) {
      console.error("데이터를 불러오는데 오류가 발생했습니다.", err);
    }
  };

  // 한 페이지 하단에 도달하면 데이터 요청
  const loadMorePosts = () => {
    const nextPage = page + 1;
    fetchPosts(nextPage, true);
    setPage(nextPage);
  };

  useEffect(() => {
    if (selectedCategory === "전체") {
      fetchPosts(0);
      setPage(0); // 페이지를 0으로 초기화
      setHasMore(true);
    } else {
      fetchCategoryPosts(selectedCategory);
      setPage(0); // 페이지를 0으로 초기화
      setHasMore(false); // 카테고리별 데이터는 모두 가져오므로 더 이상 불러오지 않음
    }
  }, [selectedCategory]);

  // "전체" 선택시에 무한스크롤
  useEffect(() => {
    if (selectedCategory === "전체" && inView && hasMore) {
      loadMorePosts();
    }
  }, [inView, hasMore]);

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

  const handleCategoryClick = (cate) => {
    setSelectedCategory(cate);
    setPosts([]);
  };

  return (
    <div style={{ paddingTop: 50 }}>
      <Header />
      <Container style={{ paddingTop: "1%", paddingBottom: "20%" }}>
        <Container
          style={{
            overflow: "auto",
            whiteSpace: "nowrap",
            padding: 1,
            marginTop: 10,
          }}
        >
          {categories.map((cate) => (
            <Button
              key={cate}
              variant={selectedCategory === cate ? "contained" : "outlined"}
              onClick={() => handleCategoryClick(cate)}
              sx={{
                mx: 0.5,
                my: 1,
                backgroundColor: selectedCategory === cate ? indigo[500] : null,
              }}
            >
              {cate}
            </Button>
          ))}
        </Container>
        <div>
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={post.post_no}>
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>
        </div>
        {selectedCategory === "전체" && (
          <div ref={ref} style={{ height: 20 }} />
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
