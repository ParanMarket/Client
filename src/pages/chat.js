import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import FooterNav from "../components/footer";
import Header from "../components/header";

const Chat = () => {
  return (
    <div className="">
      <Header />
      <h1> 채팅 페이지</h1>
      <FooterNav />
    </div>
  );
};

export default Chat;
