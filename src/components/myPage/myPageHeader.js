import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Grid } from "@mui/material";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import "../../css/logo_font.css";

const MyPageHeader = ({ title = "파란장터" }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar sx={{ p: 0 }}>
        <IconButton
          color="secondary"
          aria-label="back"
          onClick={handleBackClick}
          justifyContent="left"
          alignItems="center"
        >
          <ArrowBackIosNewRounded />
        </IconButton>
        <Grid container justifyContent="center">
          <h1 className="logo_font">{title}</h1>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default MyPageHeader;
