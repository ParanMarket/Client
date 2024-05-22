import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import Footer from "../components/footer";
import Header from "../components/header";
import { Container, Grid, Button } from "@mui/material";
import Postcard from "../components/postcard";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "샘플 제목 1",
      image: "https://via.placeholder.com/100",
      price: "10000",
      likes: 15,
      chatCount: 3,
      postedAt: "2024.05.23",
    },
    {
      id: 2,
      title: "샘플 제목 2",
      image: "https://via.placeholder.com/200",
      price: "20000",
      likes: 25,
      chatCount: 5,
      postedAt: "2024.05.23",
    },
    {
      id: 3,
      title: "샘플 제목 3",
      image: "https://via.placeholder.com/300",
      price: "20000",
      likes: 2,
      chatCount: 0,
      postedAt: "2024.05.23",
    },
    {
      id: 2,
      title: "샘플 제목 4",
      image: "https://via.placeholder.com/400",
      price: "20000",
      likes: 3,
      chatCount: 1,
      postedAt: "2024.05.23",
    },
    {
      id: 2,
      title: "샘플 제목 4",
      image: "https://via.placeholder.com/400",
      price: "20000",
      likes: 3,
      chatCount: 1,
      postedAt: "2024.05.23",
    },
    {
      id: 2,
      title: "샘플 제목 4",
      image: "https://via.placeholder.com/400",
      price: "20000",
      likes: 3,
      chatCount: 1,
      postedAt: "2024.05.23",
    },
    {
      id: 2,
      title: "샘플 제목 4",
      image: "https://via.placeholder.com/400",
      price: "20000",
      likes: 3,
      chatCount: 1,
      postedAt: "2024.05.23",
    },
    {
      id: 2,
      title: "샘플 제목 4",
      image: "https://via.placeholder.com/400",
      price: "20000",
      likes: 3,
      chatCount: 1,
      postedAt: "2024.05.23",
    },
    {
      id: 2,
      title: "샘플 제목 4",
      image: "https://via.placeholder.com/400",
      price: "20000",
      likes: 3,
      chatCount: 1,
      postedAt: "2024.05.23",
    },
  ]); // 샘플 데이터로 초기화

  return (
    <div className="screen">
      <Header />
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

export default Home;
