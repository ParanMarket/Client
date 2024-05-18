import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import "../css/LoginScreen.css";

const Forgetpwd = () => {
  const navigate = useNavigate(); // navigate 함수 초기화

  // 회원가입 페이지로 이동하는 함수
  const handleHomeClick = () => {
    navigate("/home");
  };

  // 로그인 페이지로 이동하는 함수
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="login-screen">
      <header className="header">
        {/* Your back arrow and menu icon will go here, you can use svg or icons from a library */}
      </header>
      <main className="main-content">
        <div className="logo-container">
          <img src="logo.png" alt="Logo" />
          <p>물결처럼 흐르는 파란 장터</p>
        </div>
        <div className="form-container">
          <button className="signup-button" onClick={handleHomeClick}>
            메인페이지로 돌아가기
          </button>
          <button className="login-button" onClick={handleLoginClick}>
            로그인
          </button>
        </div>
      </main>
    </div>
  );
};

export default Forgetpwd;
