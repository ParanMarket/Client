import React from "react";
import FooterNav from "../../../components/footer";
import Header from "../../../components/header";

const Chat = () => {
  return (
    <div style={{ paddingTop: 50, paddingBottom: 50 }}>
      <Header />
      <h1> 채팅 페이지</h1>
      <FooterNav />
    </div>
  );
};

export default Chat;
