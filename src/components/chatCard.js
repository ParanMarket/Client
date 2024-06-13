import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Badge,
  Grid,
  CardActionArea,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { indigo } from "@mui/material/colors";

const UnreadBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: indigo[100],
    color: indigo[100],
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

const ChatCard = ({ chat, handleCardClick }) => {
  const {
    post_title,
    user_nick,
    lastMessage,
    unread,
    lastMessageTime,
    itemImage,
  } = chat;

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
        sx={{ display: "flex", width: "100%" }}
      >
        <Box
          sx={{ position: "relative", width: 120, height: 120, margin: "3%" }}
        >
          <CardMedia
            component="img"
            sx={{ width: "100%", height: "100%", borderRadius: 2 }}
            image={itemImage || "https://via.placeholder.com/140"}
            alt={post_title}
          />
        </Box>
        <CardContent sx={{ flexGrow: 1, overflow: "hidden", pr: 3 }}>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            height="100%"
          >
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" component="div">
                {user_nick}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                {new Date(lastMessageTime).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" color="textSecondary">
                {lastMessage}
              </Typography>
              <Typography variant="subtitle2" component="div" noWrap>
                {post_title}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ChatCard;
