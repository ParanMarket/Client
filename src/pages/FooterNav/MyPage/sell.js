import React, { useState, useEffect } from "react";
import { Container, Grid, Box, Button, ButtonGroup } from "@mui/material";
import axios from "axios";
import Footer from "../../../components/main/footer";
import Header from "../../../components/myPage/myPageHeader";
import Postcard from "../../../components/post/postcard";

//테스트용 임시 데이터
import Posts from "../../../data";

const Sell = () => {
  const [posts, setPosts] = useState(Posts); // 샘플 데이터로 초기화 데이터 백에서 받아올때 useState([])
  const [filter, setFilter] = useState("all"); // 상태 카테고리
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));

  /* 사용자의 판매 내역 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get("http://localhost:5001/my-posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      setPosts(data);
    };
    fetchPosts();
  }, []); */

  // 필터 상태 변경 반영하기
  useEffect(() => {
    if (filter === "all") {
      setPosts(Posts);
    } else {
      const filteredPosts = Posts.filter((post) => {
        if (filter === "active") {
          return post.status === 0 || post.status === 1;
        } else if (filter === "completed") {
          return post.status === 2;
        }
      });
      setPosts(filteredPosts);
    }
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <Header title="판매내역" />
      <ButtonGroup fullWidth sx={{ mt: 1 }}>
        <Button
          variant={filter === "all" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("all")}
        >
          전체
        </Button>
        <Button
          variant={filter === "active" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("active")}
        >
          판매중
        </Button>
        <Button
          variant={filter === "completed" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("completed")}
        >
          거래완료
        </Button>
      </ButtonGroup>

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

export default Sell;
