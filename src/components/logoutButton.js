import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>
      로그아웃
    </Button>
  );
};

export default LogoutButton;
