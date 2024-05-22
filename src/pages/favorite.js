import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import Footer from "../components/footer";
import Header from "../components/header";

const Favorite = () => {
  return (
    <div className="screen">
      <Header />
      <h1>좋아요 페이지입니다.</h1>
      <Footer />
    </div>
  );
};

export default Favorite;
