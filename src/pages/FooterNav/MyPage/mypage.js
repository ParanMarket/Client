import React from "react";
import FooterNav from "../../../components/footer";
import Header from "../../../components/header";

const Mypage = () => {
  return (
    <div style={{ paddingTop: 50, paddingBottom: 50 }}>
      <Header />
      <h1> 마이 페이지 입니다.</h1>
      <FooterNav />
    </div>
  );
};

export default Mypage;
