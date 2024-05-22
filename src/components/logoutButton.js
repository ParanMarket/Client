import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue["A100"]),
    backgroundColor: blue["A100"],
    "&:hover": {
      backgroundColor: blue["A400"],
    },
  }));

  return (
    <ColorButton variant="contained" onClick={handleLogout}>
      로그아웃
    </ColorButton>
  );
};

export default LogoutButton;
