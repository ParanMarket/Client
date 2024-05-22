import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import FooterNav from "../components/footer";
import Header from "../components/header";

const Mypage = () => {
  return (
    <div className="">
      <Header />
      <h1> 마이 페이지 입니다.</h1>
      <FooterNav />
    </div>
  );
};

export default Mypage;
