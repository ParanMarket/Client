import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Footer from "../../components/main/footer";
import Header from "../../components/main/header";

function Report() {
  const location = useLocation(); // state 에서 post정보 가져오기
  const post = JSON.parse(location.state);
  const { post_no } = useParams(); // URL에서 post_no 추출

  return (
    <div style={{ paddingTop: 80, paddingBottom: 80 }}>
      <Header />
      <h1>신고 페이지입니다.</h1>
      <p>Reporting post_no: {post_no}</p>
      <p>Reporting post with TITLE: {post.post_title}</p>
      <p>Reporting post with NICK: {post.post_user_nick}</p>
      <Footer />
    </div>
  );
}

export default Report;
