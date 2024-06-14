import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import Header from "./Header"; //공통헤더
import Home from "./pages/FooterNav/home";
import Login from "./pages/User/login";
import First from "./pages/first";
import Chat from "./pages/FooterNav/Chat/chat";
import Favorite from "./pages/FooterNav/MyPage/favorite";
import Search from "./pages/HeaderNav/search";
import Notifications from "./pages/HeaderNav/notifications";
import Settings from "./pages/FooterNav/MyPage/settings";
import Profile from "./pages/FooterNav/MyPage/profile";
import WritePost from "./pages/FooterNav/Post/WritePost";
import Mypage from "./pages/FooterNav/MyPage/mypage";
import Sell from "./pages/FooterNav/MyPage/sell";
import Buy from "./pages/FooterNav/MyPage/buy";
import Report from "./pages/HeaderNav/report";
import ChatRoom from "./pages/FooterNav/Chat/chatRoom";
import PostDetail from "./pages/FooterNav/Post/postDetail";
import NickSetting from "./pages/User/nickSetting";
import EditPost from "./pages/FooterNav/Post/editPost";
import NotFoundPage from "./components/notFoundPage";
import ProtectedRoute from "./protectedRoute"; // Import the ProtectedRoute component

function App() {
  //우클릭 방지
  useEffect(() => {
    document.oncontextmenu = function () {
      return false;
    };
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    setIsAuthenticated(!!userToken);
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3F51B5",
      },
      secondary: {
        main: "#7986CB",
        light: "#E8EAF6",
      },
      error: {
        main: "#ff4747",
      },
      // 추가적으로 필요한 색상 정의
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<First />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="/home"
              element={
                <ProtectedRoute
                  element={<Home />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute
                  element={<Chat />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/favorite"
              element={
                <ProtectedRoute
                  element={<Favorite />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/writePost"
              element={
                <ProtectedRoute
                  element={<WritePost />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute
                  element={<Search />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute
                  element={<Settings />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={<Profile />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/mypage"
              element={
                <ProtectedRoute
                  element={<Mypage />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/buy"
              element={
                <ProtectedRoute
                  element={<Buy />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/sell"
              element={
                <ProtectedRoute
                  element={<Sell />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/post/:post_no"
              element={
                <ProtectedRoute
                  element={<PostDetail />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/report/:post_no"
              element={
                <ProtectedRoute
                  element={<Report />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/chat/chatRoom/:chat_no"
              element={
                <ProtectedRoute
                  element={<ChatRoom />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/editPost/:post_no"
              element={
                <ProtectedRoute
                  element={<EditPost />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute
                  element={<Notifications />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/nickSetting"
              element={
                <ProtectedRoute
                  element={<NickSetting />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route path="/404" element={<NotFoundPage />}></Route>
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
