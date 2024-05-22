import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Header from "./Header"; //공통헤더
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import First from "./pages/first";
import FindPwd from "./pages/findPwd";
import Chat from "./pages/chat";
import Favorite from "./pages/favorite";
import Search from "./pages/search";
import Notifications from "./pages/notifications";
import Settings from "./pages/settings";
import Profile from "./pages/profile";
import WritePost from "./pages/WritePost";

function App() {
  //우클릭 방지
  useEffect(() => {
    document.oncontextmenu = function () {
      return false;
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<First />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/findPwd" element={<FindPwd />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/favorite" element={<Favorite />}></Route>
          <Route path="/writePost" element={<WritePost />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/notifications" element={<Notifications />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
