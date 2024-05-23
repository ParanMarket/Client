import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  TextField,
  Box,
  ImageList,
  ImageListItem,
  IconButton,
  ButtonGroup,
  Grid,
} from "@mui/material";
import { PhotoCamera, Delete, AllInbox, People } from "@mui/icons-material";
import Footer from "../components/footer";
import Header from "../components/header";
import { indigo } from "@mui/material/colors";
import axios from "axios";

const WritePost = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [wayPeople, setWayPeople] = useState("");
  const [wayLocker, setWayLocker] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [titleError, setTitleError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [wayError, setWayError] = useState("");
  const [postError, setPostError] = useState("");
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));

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

  // 유형 미선택시 에러
  const handleTypeChange = (newType) => {
    setType(newType);
    setTypeError(newType ? "" : "유형을 선택해주세요.");
  };

  const handleWayPeopleClick = () => {
    setWayPeople((prev) => (prev === "0" ? "" : "0"));
    setWayError("");
  };

  const handleWayLockerClick = () => {
    setWayLocker((prev) => (prev === "1" ? "" : "1"));
    setWayError("");
  };

  //서버로 입력 내용 보내기
  const handlePost = async (formData) => {
    try {
      const response = await axios.post("http://localhost:5000/", formData, {
        headers: {
          Authorization: `Bearer ${userToken}`, // Authorization 헤더에 토큰 포함
        },
      });
      if (response.data.message === "success") {
        console.log(response.data, "성공");
        alert("등록하였습니다.");
        console.log("홈 페이지로 이동합니다.");
        navigate("/home");
      } else {
        console.log(response.data.message + "서버 오류");
      }
      navigate("/home");
    } catch (error) {
      console.error(error);
      setPostError("등록에 실패하였습니다.");
    }
  };

  const formRef = useRef(null); // 폼 요소에 대한 참조 생성

  // 폼 제출시 통신 연결
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    let isValid = true;

    //로그인 했을 때만 글쓰기 가능
    if (!userToken) {
      alert("로그인이 필요합니다.");
      navigate("/");
      return;
    }

    if (!title || title.length < 4) {
      setTitleError("제목은 4자 이상 적어주세요.");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (!price) {
      setPriceError("가격을 입력해주세요.");
      isValid = false;
    } else if (!/^[0-9]*$/.test(price)) {
      setPriceError("숫자만 입력 가능합니다.");
      isValid = false;
    } else {
      setPriceError("");
    }

    if (!type) {
      setTypeError("유형을 선택해주세요.");
      isValid = false;
    } else {
      setTypeError("");
    }

    if (!wayPeople && !wayLocker) {
      setWayError("거래방식을 선택해주세요.");
      isValid = false;
    } else {
      setWayError("");
    }

    if (!description || description.length < 10) {
      setDescriptionError("내용은 10자 이상 적어주세요.");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (!isValid) {
      alert("입력한 정보를 확인해주세요.");
      return;
    }

    let way;
    if (wayPeople === "0" && wayLocker === "1") {
      way = 2;
    } else if (wayLocker === "1") {
      way = 1;
    } else if (wayPeople === "0") {
      way = 0;
    } else {
      way = null;
    }

    formData.append("title", title);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("description", description);
    if (way !== null) {
      formData.append("way", way);
    }
    files.forEach((file, index) =>
      formData.append(`files[${index}]`, file.file)
    );

    //잘 올라가는지 확인 (추후 삭제 예정)
    // 파일은 보안상 경로가 나타지 않고 업로드 확인용으로 이름만 표시함
    for (let [key, value] of formData.entries()) {
      console.log(key, value instanceof File ? value.name : value);
    }

    //서버 통신
    handlePost(formData);
  };

  return (
    <div style={{ paddingTop: "15%", paddingBottom: "15%" }}>
      <Header />
      <form ref={formRef} onSubmit={handleSubmit}>
        <Box sx={{ flexGrow: 1, p: 1 }}>
          <Box sx={{ p: 2 }}>
            <Typography fontWeight="bold">사진</Typography>
            <div
              style={{ display: "flex", overflowX: "auto", padding: "8px 0" }}
            >
              <Button
                variant="contained"
                component="label"
                color="secondary"
                sx={{
                  minWidth: 100,
                  height: 100,
                  marginRight: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: indigo[500],
                  },
                }}
              >
                <PhotoCamera />
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
            <Typography fontWeight="bold">제목</Typography>
            <TextField
              fullWidth
              label="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              error={titleError !== ""}
              helperText={titleError}
            />
            <Box>
              <Typography sx={{ marginBottom: 1 }} fontWeight="bold">
                유형
              </Typography>
              <ButtonGroup fullWidth>
                <Button
                  variant={type === "판매" ? "contained" : "outlined"}
                  onClick={() => handleTypeChange("판매")}
                >
                  판매하기
                </Button>
                <Button
                  variant={type === "구매" ? "contained" : "outlined"}
                  onClick={() => handleTypeChange("구매")}
                >
                  구하기
                </Button>
              </ButtonGroup>
              {typeError && (
                <Typography
                  color="error"
                  variant="caption"
                  sx={{ marginLeft: 1.5 }}
                >
                  {typeError}
                </Typography>
              )}
            </Box>
            <Typography sx={{ margin: 1, marginLeft: 0 }} fontWeight="bold">
              거래방식
            </Typography>
            <Box display="flex">
              <Box sx={{ marginRight: 2 }}>
                <Button
                  variant={
                    wayError ? "outlined" : wayPeople ? "contained" : "outlined"
                  }
                  onClick={handleWayPeopleClick}
                  value="대면"
                  color={wayError ? "error" : "primary"}
                >
                  <People sx={{ marginRight: 2 }} />
                  대면 거래
                </Button>
              </Box>
              <Box>
                <Button
                  variant={
                    wayError ? "outlined" : wayLocker ? "contained" : "outlined"
                  }
                  onClick={handleWayLockerClick}
                  value="사물함"
                  color={wayError ? "error" : "primary"}
                >
                  <AllInbox sx={{ marginRight: 2 }} />
                  사물함 거래
                </Button>
              </Box>
            </Box>
            {wayError && (
              <Typography color="error" variant="caption" sx={{ marginTop: 1 }}>
                {wayError}
              </Typography>
            )}
            <TextField
              fullWidth
              label="가격"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              error={priceError !== ""}
              helperText={priceError}
              margin="normal"
            />
            <Typography fontWeight="bold">설명</Typography>
            <TextField
              fullWidth
              label="자세한 설명을 적어주세요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={5}
              margin="normal"
              error={descriptionError !== ""}
              helperText={descriptionError}
            />
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              onClick={handleSubmit}
              size="large"
              sx={{
                mt: 2,
                "&:hover": {
                  backgroundColor: indigo[500],
                },
              }}
            >
              작성 완료
            </Button>
          </Box>
        </Box>
      </form>
      <Footer />
    </div>
  );
};

export default WritePost;
