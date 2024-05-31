import React, { useState, useEffect } from "react";
import { Container, Grid, CircularProgress } from "@mui/material";
import axios from "axios";
import Footer from "../../../components/main/footer";
import Header from "../../../components/myPage/myPageHeader";
import Postcard from "../../../components/post/postcard";

//테스트용 임시 데이터
import Posts from "../../../data";

const Buy = () => {
  const [posts, setPosts] = useState([]); // 샘플 데이터로 초기화
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [loading, setLoading] = useState(true);

  //사용자의 구매 내역 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/buy", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        setPosts(data);
      } catch (err) {
        console.error("구매내역을 불러오는데 실패했습니다.");
        //임시데이터 불러오기
        setPosts(Posts);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <Header title="구매내역" />
      {loading ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "30vh" }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Container style={{ paddingTop: "5%", paddingBottom: "20%" }}>
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={4}>
                <Postcard post={post} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      <Footer />
    </div>
  );
};

export default Buy;
