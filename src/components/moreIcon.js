import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Menu, MenuItem, IconButton, Grid } from "@mui/material";
import { MoreVertRounded } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";
import axios from "axios";

const MoreIcon = () => {
  const { no } = useParams(); //현재 페이지 URL에서 id 파라미터 추출
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReport = () => {
    navigate(`/report/${no}`);
  };

  return (
    <Grid>
      <IconButton
        aria-label="더보기"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleMenuClick}
        color="inherit"
      >
        <MoreVertRounded />
      </IconButton>
      <Menu
        id="long-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={handleReport}
          sx={{
            "&:hover": {
              backgroundColor: indigo[50],
            },
          }}
        >
          신고하기
        </MenuItem>
      </Menu>
    </Grid>
  );
};
export default MoreIcon;
