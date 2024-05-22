import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import Header from "../components/header";
import Footer from "../components/footer";

const Settings = () => {
  return (
    <div className="">
      <Header />
      <h1>설정 페이지</h1>
      <Footer />
    </div>
  );
};

export default Settings;
