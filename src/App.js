import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Header from "./Header"; //공통헤더
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import First from "./pages/first";
import Findpwd from "./pages/findpwd";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/first" element={<First />}></Route>
          <Route path="/findpwd" element={<Findpwd />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
