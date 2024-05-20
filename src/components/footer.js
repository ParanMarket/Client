import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, Add, Chat, Settings } from "@mui/icons-material";

const FooterNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedIndex = () => {
    switch (location.pathname) {
      case "/home":
        return 0;
      case "/chat":
        return 1;
      case "/uploadItem":
        return 2;
      case "/settings":
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
        navigate("/uploadItem");
        break;
      case 3:
        navigate("/settings");
        break;
      default:
        navigate("/home");
    }
  };

  return (
    <footer>
      <BottomNavigation
        sx={{ width: "100%", position: "fixed", bottom: 0 }}
        value={getSelectedIndex()}
        onChange={handleChange}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Chat" icon={<Chat />} />
        <BottomNavigationAction label="Add Item" icon={<Add />} />
        <BottomNavigationAction label="Settings" icon={<Settings />} />
      </BottomNavigation>
    </footer>
  );
};

export default FooterNav;
