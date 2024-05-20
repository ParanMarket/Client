import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import FooterNav from "../components/footer";

const Settings = () => {
  return (
    <div className="">
      <h1>설정 페이지</h1>
      <FooterNav />
    </div>
  );
};

export default Settings;
