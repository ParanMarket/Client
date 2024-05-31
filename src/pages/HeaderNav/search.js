import React, { useState } from "react";
import {
  Input,
  Grid,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/main/footer";
import Postcard from "../../components/post/postcard";
import Posts from "../../data";
import { ArrowBackIosNewRounded } from "@mui/icons-material";

const Search = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isSearched, setIsSearched] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setIsSearched(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // 검색 내용이 빈 문자열 / 공백만 있는 경우에는 검색 안됨
    if (typeof search === "string" && search.trim() !== "") {
      setIsSearched(true);
    } else {
      setIsSearched(false); // 검색창이 ""이면 결과창에 아무것도 띄우지 않기
      setSearch([]);
      alert("검색어를 입력해주세요.");
      return;
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const getStatusFilter = (post) => {
    switch (filter) {
      case "all":
        return true;
      case "sell":
        return post.type === 0;
      case "buy":
        return post.type === 1;
      default:
        return true;
    }
  };

  const searched = Posts.filter((item) => {
    const itemTitle =
      typeof item.title === "string"
        ? item.title.toLowerCase().replace(/\s+/g, "")
        : "";
    const searchTerm =
      typeof search === "string"
        ? search.toLowerCase().replace(/\s+/g, "")
        : "";
    return itemTitle.includes(searchTerm) && getStatusFilter(item);
  });

  return (
    <div style={{ paddingBottom: 60 }}>
      <div style={{ padding: 10 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2, mb: 2 }}
        >
          <IconButton
            color="secondary"
            aria-label="back"
            onClick={handleBackClick}
            sx={{ paddingRight: 2 }}
          >
            <ArrowBackIosNewRounded />
          </IconButton>
          <Box
            display="flex"
            alignItems="center"
            sx={{ flexGrow: 1, ml: "5%" }}
          >
            <Input
              variant="outlined"
              type="text"
              value={search}
              onChange={handleSearch}
              onKeyDown={handleKeyDown} // 엔터키 가능
              placeholder="검색어를 입력해주세요."
              color="primary"
              size="medium"
              sx={{
                width: "60%",
                height: 45,
                border: "1px solid #7986CB",
                borderRadius: "4px",
                p: 1,
              }}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              size="large"
              sx={{ ml: 3 }}
            >
              검색
            </Button>
          </Box>
        </Box>
        {isSearched && (
          <Box sx={{ mt: 2, mb: 2 }}>
            <Button
              variant={filter === "all" ? "contained" : "outlined"}
              onClick={() => handleFilterChange("all")}
              sx={{ mr: 1 }}
            >
              전체
            </Button>
            <Button
              variant={filter === "sell" ? "contained" : "outlined"}
              onClick={() => handleFilterChange("sell")}
              sx={{ mr: 1 }}
            >
              판매글
            </Button>
            <Button
              variant={filter === "buy" ? "contained" : "outlined"}
              onClick={() => handleFilterChange("buy")}
              sx={{ mr: 1 }}
            >
              구매글
            </Button>
          </Box>
        )}
        <Box>
          {isSearched && (
            <Grid container spacing={2}>
              {searched.map((post) => (
                <Grid item key={post.id} xs={12} sm={6} md={4}>
                  <Postcard post={post} />
                </Grid>
              ))}
            </Grid>
          )}
          {isSearched && searched.length === 0 && (
            <Typography variant="h6" sx={{ textAlign: "center", m: 10 }}>
              검색 결과 없음
            </Typography>
          )}
        </Box>
      </div>

      <Footer />
    </div>
  );
};

export default Search;
