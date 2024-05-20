import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Header from "./Header"; //공통헤더
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import First from "./pages/first";
import FindPwd from "./pages/findPwd";
import Chat from "./pages/chat";
import Settings from "./pages/settings";
import UploadItem from "./pages/uploadItem";
import FooterNav from "./components/footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/first" element={<First />}></Route>
          <Route path="/findpwd" element={<FindPwd />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/uploadItem" element={<UploadItem />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
