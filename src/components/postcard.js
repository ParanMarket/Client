import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  CardActionArea,
} from "@mui/material";
import { Favorite, Chat, MoreVert } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";

const Postcard = ({ post }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleCardClick = () => {
    navigate(`/post/${post.no}`);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReport = () => {
    navigate(`/report/${post.no}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        height: 140,
        position: "relative",
        "&:hover": {
          backgroundColor: indigo[50],
        },
      }}
    >
      <CardActionArea
        onClick={handleCardClick}
        sx={{ display: "flex", width: "100%", padding: 0 }}
      >
        <CardMedia
          component="img"
          sx={{ width: 120, height: 120, margin: "3%" }}
          image={post.images[0] || "https://via.placeholder.com/140"}
          alt={post.title}
        />
        <CardContent sx={{ flexGrow: 1, overflow: "hidden", padding: 0 }}>
          <Typography variant="h6" component="div">
            {post.title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {post.price}원
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {new Date(post.sdd).toLocaleDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          position: "absolute",
          bottom: 0,
          right: 3,
          padding: 0,
          margin: 0,
        }}
      >
        <IconButton aria-label="찜" sx={{ padding: 0, margin: 0 }}>
          <Favorite sx={{ width: "30%" }} />
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            {post.likes}
          </Typography>
        </IconButton>
        <IconButton aria-label="채팅 수" sx={{ padding: 0, margin: 0 }}>
          <Chat sx={{ width: "35%" }} />
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            {post.chatCount}
          </Typography>
        </IconButton>
      </CardActions>
      <IconButton
        aria-label="더보기"
        sx={{ position: "absolute", top: "-1%", right: "-1%" }}
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        <MoreVert />
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
    </Card>
  );
};

export default Postcard;
