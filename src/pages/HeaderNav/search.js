import React, { useState } from "react";
import { Input, Grid, Box, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Postcard from "../../components/postcard";
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
    if (search.trim() !== "") {
      setIsSearched(true);
    } else {
      setIsSearched(false); // 검색창이 ""이면 결과창에 아무것도 띄우지 않기
      setSearch([]);
      alert("검색어를 입력해주세요.");
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const getStatusFilter = (post) => {
    switch (filter) {
      case "all":
        return true;
      case "active":
        return post.status === 0 || post.status === 1;
      case "completed":
        return post.status === 2;
      default:
        return true;
    }
  };

  const searched = Posts.filter((item) => {
    const itemTitle = item.title.toLowerCase().replace(" ", "");
    const searchTerm = search.toLowerCase().replace(" ", "");
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
              variant={filter === "active" ? "contained" : "outlined"}
              onClick={() => handleFilterChange("active")}
              sx={{ mr: 1 }}
            >
              거래가능
            </Button>
            <Button
              variant={filter === "completed" ? "contained" : "outlined"}
              onClick={() => handleFilterChange("completed")}
              sx={{ mr: 1 }}
            >
              거래완료
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
        </Box>
      </div>

      <Footer />
    </div>
  );
};

export default Search;
