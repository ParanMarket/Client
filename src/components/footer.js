import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, Add, Chat, Favorite } from "@mui/icons-material";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedIndex = () => {
    switch (location.pathname) {
      case "/home":
        return 0;
      case "/chat":
        return 1;
      case "/WritePost":
        return 2;
      case "/favorite":
        return 3;
      default:
        return 0;
    }
  };

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        navigate("/home");
        break;
      case 1:
        navigate("/chat");
        break;
      case 2:
        navigate("/WritePost");
        break;
      case 3:
        navigate("/favorite");
        break;
      default:
        navigate("/home");
    }
  };

  return (
    <footer>
      <BottomNavigation
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
        value={getSelectedIndex()}
        onChange={handleChange}
        showLabels
      >
        <BottomNavigationAction label="홈" icon={<Home />} />
        <BottomNavigationAction label="채팅" icon={<Chat />} />
        <BottomNavigationAction label="글쓰기" icon={<Add />} />
        <BottomNavigationAction label="좋아요" icon={<Favorite />} />
      </BottomNavigation>
    </footer>
  );
};

export default Footer;
