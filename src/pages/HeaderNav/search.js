import React, { useState } from "react";
import { Input, Grid, Box, Button } from "@mui/material";
import Footer from "../../components/footer";
import Postcard from "../../components/postcard";
import Posts from "../../data";

const Search = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const handleSearch = (e) => {
    setSearch(e.target.value);
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
    const itemTitle = item.title.replace(" ", "").toLowerCase();
    const searchTerm = search.toLowerCase().replace(" ", "");
    return itemTitle.includes(searchTerm) && getStatusFilter(item);
  });

  return (
    <div style={{ paddingBottom: 50 }}>
      <div style={{ paddingTop: 10, paddingLeft: 10 }}>
        <Input
          varient="outlined"
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="검색어를 입력해주세요."
        />
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
        {search && (
          <Grid container spacing={2}>
            {searched.map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={4}>
                <Postcard post={post} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Search;
