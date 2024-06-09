import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, TextField, Box, Grid } from "@mui/material";
import Footer from "../../../components/main/footer";
import Header from "../../../components/main/header";
import { indigo } from "@mui/material/colors";
import axios from "axios";

const EditPost = () => {
  const { post_no } = useParams();
  const [title, setTitle] = useState(null);
  const [type, setType] = useState(null);
  const [price, setPrice] = useState(null);
  const [comment, setComment] = useState(null);
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/post/get_post/${post_no}`,
        );
        const postData = response.data[0];
        console.log(postData);
        setTitle(postData.post_title || null);
        setType(postData.post_type || null);
        setPrice(postData.post_price || null);
        setComment(postData.post_comment || null);
      } catch (error) {
        console.error("Failed to fetch post data", error);
      }
    };
    fetchPostData();
  }, [post_no, setTitle, setType, setPrice, setComment]);

  const handleTypeChange = (newType) => {
    setType(newType);
  };

  const updateType = parseInt(type, 10);
  const updateNo = parseInt(post_no, 10);
  const updatePrice = parseInt(price, 10);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      post_no: updateNo,
      post_title: title,
      post_comment: comment,
      post_price: updatePrice,
      post_type: updateType,
    };
    console.log(formData);
    try {
      const response = await axios.post(
        `http://localhost:5001/post/post_update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      if (response.data.message === "success") {
        alert("수정하였습니다.");
        navigate("/home");
      } else {
        console.log(response.data.message + " 서버 오류");
      }
    } catch (error) {
      console.error("수정 중 오류 발생", error);
    }
  };

  return (
    <div style={{ paddingTop: 50, paddingBottom: 50 }}>
      <Header />
      <form onSubmit={handleSubmit}>
        <Box sx={{ flexGrow: 1, p: 1 }}>
          <Box sx={{ p: 2 }}>
            <Typography fontWeight="bold">제목</Typography>
            <TextField
              fullWidth
              label=""
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
            />
            <Box>
              <Typography sx={{ marginBottom: 1 }} fontWeight="bold">
                유형
              </Typography>
              <Button
                variant={type === "0" ? "contained" : "outlined"}
                onClick={() => handleTypeChange("0")}
              >
                판매하기
              </Button>
              <Button
                variant={type === "1" ? "contained" : "outlined"}
                onClick={() => handleTypeChange("1")}
              >
                구매하기
              </Button>
            </Box>
            <TextField
              fullWidth
              label=""
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              margin="normal"
            />
            <Typography fontWeight="bold">설명</Typography>
            <TextField
              fullWidth
              label=""
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
              rows={5}
              margin="normal"
            />
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              type="submit"
              size="large"
              sx={{
                mt: 2,
                "&:hover": {
                  backgroundColor: indigo[500],
                },
              }}
            >
              수정 완료
            </Button>
          </Box>
        </Box>
      </form>
      <Footer />
    </div>
  );
};

export default EditPost;
