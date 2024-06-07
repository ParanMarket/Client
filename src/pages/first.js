import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import "../css/LoginScreen.css";

const First = () => {
  const navigate = useNavigate(); // navigate 함수 초기화

  // 회원가입 페이지로 이동
  const handleSignupClick = () => {
    navigate("/register");
  };

  // 로그인 페이지로 이동
  const handleLoginClick = () => {
    navigate("/login");
  };

  //로고 클릭시 홈페이지로 이동
  const handleLogoClick = () => {
    navigate("/home");
  };
  return (
    <div className="login-screen">
      <header className="header">
        {/* Your back arrow and menu icon will go here, you can use svg or icons from a library */}
      </header>
      <main className="main-content">
        <div className="logo-container">
          <img src="../logo.png" alt="Logo" onClick={handleLogoClick} />
          <p>물결처럼 흐르는 파란 장터</p>
        </div>
        <div className="form-container">
          <button className="login-button" onClick={handleLoginClick}>
            시작하기
          </button>
        </div>
      </main>
    </div>
  );
};

export default First;
