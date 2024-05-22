import React, { useState } from "react";
import {
  Typography,
  Button,
  Checkbox,
  TextField,
  FormControlLabel,
  Box,
  FormControl,
  Radio,
  RadioGroup,
  ImageList,
  ImageListItem,
  IconButton,
} from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";
import Footer from "../components/footer";
import Header from "../components/header";
import { blue } from "@mui/material/colors";

const WritePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [files, setFiles] = useState([]);

  // 사진 업로드
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (files.length + newFiles.length > 10) {
      alert("최대 업로드 개수는 10개입니다.");
      return;
    }
    const mappedFiles = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...mappedFiles]);
  };

  // 사진 올린거 삭제하기
  const handleRemoveFile = (fileToRemove) => {
    setFiles((prev) =>
      prev.filter((file) => file.preview !== fileToRemove.preview)
    );
    URL.revokeObjectURL(fileToRemove.preview);
  };

  // 폼 제출시 통신 연결
  const handleSubmit = () => {
    console.log("Submitted:", title, price, description, agreeTerms);
  };

  return (
    <div>
      <Header />
      <div>
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Box sx={{ p: 2 }}>
            <Typography>사진</Typography>
            <div
              style={{ display: "flex", overflowX: "auto", padding: "8px 0" }}
            >
              <Button
                variant="contained"
                component="label"
                startIcon={<PhotoCamera />}
                sx={{
                  minWidth: 100,
                  height: 100,
                  marginRight: 2,
                  backgroundColor: blue["A100"],
                  "&:hover": {
                    backgroundColor: blue["A200"],
                  },
                }}
              >
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </Button>
              <ImageList
                cols={10}
                rowHeight={100}
                sx={{ width: "100%", height: 100 }}
              >
                {files.map((file, index) => (
                  <Box
                    key={file.preview}
                    sx={{
                      width: 100,
                      height: 100,
                      position: "relative",
                      marginRight: 2,
                    }}
                  >
                    <img
                      src={file.preview}
                      alt={`upload-preview-${index}`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <IconButton
                      onClick={() => handleRemoveFile(file)}
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        color: "gray",
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
              </ImageList>
            </div>
            <Typography>제목</Typography>
            <TextField
              fullWidth
              label="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
            />
            <Typography>거래방식</Typography>
            <FormControl component="fieldset" margin="normal">
              <RadioGroup
                row
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <FormControlLabel
                  value="판매하기"
                  control={<Radio />}
                  label="판매하기"
                />
                <FormControlLabel
                  value="구하기"
                  control={<Radio />}
                  label="구하기"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              fullWidth
              label="가격"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.value)}
                />
              }
              label="가격 제안 받기"
            />
            <Typography>설명</Typography>
            <TextField
              fullWidth
              label="자세한 설명을 적어주세요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={5}
              margin="normal"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              size="large"
              sx={{
                backgroundColor: blue["A100"],
                mt: 2,
                "&:hover": {
                  backgroundColor: blue["A200"],
                },
              }}
            >
              작성 완료
            </Button>
          </Box>
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default WritePost;
