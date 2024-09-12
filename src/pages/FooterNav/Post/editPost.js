// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Typography,
//   Button,
//   TextField,
//   Box,
//   Grid,
//   ButtonGroup,
// } from "@mui/material";
// import Footer from "../../../components/main/footer";
// import Header from "../../../components/main/header";
// import { indigo } from "@mui/material/colors";
// import axios from "axios";
// import {
//   AllInbox,
//   People,
//   SellRounded,
//   ShoppingCartRounded,
// } from "@mui/icons-material";
//
// const EditPost = () => {
//   const { post_no } = useParams();
//   const [title, setTitle] = useState(null);
//   const [type, setType] = useState(null);
//   const [price, setPrice] = useState(null);
//   const [comment, setComment] = useState(null);
//   const navigate = useNavigate();
//   const userToken = localStorage.getItem("userToken");
//
//   useEffect(() => {
//     const fetchPostData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5001/post/get_post/${post_no}`,
//         );
//         const postData = response.data[0];
//         console.log(postData);
//         setTitle(postData.post_title || null);
//         setType(postData.post_type || null);
//         setPrice(postData.post_price || null);
//         setComment(postData.post_comment || null);
//       } catch (error) {
//         console.error("Failed to fetch post data", error);
//       }
//     };
//     fetchPostData();
//   }, [post_no, setTitle, setType, setPrice, setComment]);
//
//   const handleTypeChange = (newType) => {
//     setType(newType);
//   };
//
//   const updateType = parseInt(type, 10);
//   const updateNo = parseInt(post_no, 10);
//   const updatePrice = parseInt(price, 10);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//
//     const formData = {
//       post_no: updateNo,
//       post_title: title,
//       post_comment: comment,
//       post_price: updatePrice,
//       post_type: updateType,
//     };
//     console.log(formData);
//     try {
//       const response = await axios.post(
//         `http://localhost:5001/post/post_update`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//           },
//         },
//       );
//
//       if (response.data.message === "success") {
//         alert("수정하였습니다.");
//         navigate("/home");
//       } else {
//         console.log(response.data.message + " 서버 오류");
//       }
//     } catch (error) {
//       console.error("수정 중 오류 발생", error);
//     }
//   };
//
//   return (
//     <div style={{ paddingTop: 50, paddingBottom: 50 }}>
//       <Header />
//       <form onSubmit={handleSubmit}>
//         <Box sx={{ flexGrow: 1, p: 1 }}>
//           <Box sx={{ p: 2 }}>
//             <Typography fontWeight="bold">제목</Typography>
//             <TextField
//               fullWidth
//               label=""
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               margin="normal"
//             />
//             <Box>
//               <Typography sx={{ marginBottom: 1 }} fontWeight="bold">
//                 유형
//               </Typography>
//               <ButtonGroup fullWidth>
//                 <Button
//                   variant={type === "0" ? "contained" : "outlined"}
//                   onClick={() => handleTypeChange("0")}
//                 >
//                   <SellRounded sx={{ marginRight: 1 }} />
//                   판매하기
//                 </Button>
//                 <Button
//                   variant={type === "1" ? "contained" : "outlined"}
//                   onClick={() => handleTypeChange("1")}
//                 >
//                   <ShoppingCartRounded sx={{ marginRight: 1 }} />
//                   구매하기
//                 </Button>
//               </ButtonGroup>
//               {typeError && (
//                 <Typography
//                   color="error"
//                   variant="caption"
//                   sx={{ marginLeft: 1.5 }}
//                 >
//                   {typeError}
//                 </Typography>
//               )}
//             </Box>
//             <Typography sx={{ margin: 1, marginLeft: 0 }} fontWeight="bold">
//               거래방식
//             </Typography>
//             <Box display="flex">
//               <Box sx={{ marginRight: 2 }}>
//                 <Button
//                   variant={
//                     wayError ? "outlined" : wayPeople ? "contained" : "outlined"
//                   }
//                   onClick={handleWayPeopleClick}
//                   value="대면"
//                 >
//                   <People sx={{ marginRight: 1 }} />
//                   대면 거래
//                 </Button>
//               </Box>
//               <Box>
//                 <Button
//                   variant={
//                     wayError ? "outlined" : wayLocker ? "contained" : "outlined"
//                   }
//                   onClick={handleWayLockerClick}
//                   value="사물함"
//                 >
//                   <AllInbox sx={{ marginRight: 1 }} />
//                   사물함 거래
//                 </Button>
//               </Box>
//             </Box>
//             {wayError && (
//               <Typography
//                 color="error"
//                 variant="caption"
//                 sx={{ marginTop: 1, ml: 2 }}
//               >
//                 {wayError}
//               </Typography>
//             )}
//
//             <Typography sx={{ margin: 1, marginLeft: 0 }} fontWeight="bold">
//               물품유형
//             </Typography>
//             <Grid container spacing={1}>
//               {categories.map((categoryItem, index) => (
//                 <Grid item xs={4} key={index}>
//                   <Button
//                     fullWidth
//                     variant={
//                       category === categoryItem.value ? "contained" : "outlined"
//                     }
//                     onClick={() => handleCategoryClick(categoryItem.value)}
//                     color="primary"
//                   >
//                     {categoryItem.label}
//                   </Button>
//                 </Grid>
//               ))}
//             </Grid>
//             {categoryError && (
//               <Typography
//                 color="error"
//                 variant="caption"
//                 sx={{ marginTop: 1, ml: 2 }}
//               >
//                 {categoryError}
//               </Typography>
//             )}
//             <TextField
//               fullWidth
//               label=""
//               type="text"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               margin="normal"
//             />
//             <Typography fontWeight="bold">설명</Typography>
//             <TextField
//               fullWidth
//               label=""
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               multiline
//               rows={5}
//               margin="normal"
//             />
//             <Button
//               fullWidth
//               color="secondary"
//               variant="contained"
//               type="submit"
//               size="large"
//               sx={{
//                 mt: 2,
//                 "&:hover": {
//                   backgroundColor: indigo[500],
//                 },
//               }}
//             >
//               수정 완료
//             </Button>
//           </Box>
//         </Box>
//       </form>
//       <Footer />
//     </div>
//   );
// };
//
// export default EditPost;

import React, { useEffect, useState } from "react";
import PostForm from "../../../components/post/postForm";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/main/header";
import Footer from "../../../components/main/footer";

const EditPost = () => {
  const { post_no } = useParams();
  const [postData, setPostData] = useState(null);
  const [postImages, setPostImages] = useState([]);
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    // 게시글 데이터 불러오기
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/post/get_post/${post_no}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          },
        );
        setPostData(response.data);
      } catch (error) {
        console.error("게시글 데이터를 불러오는데 실패했습니다.", error);
      }
    };

    // 게시글 이미지 불러오기
    const fetchPostImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/post/get_post_img/${post_no}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          },
        );
        const imageUrls = response.data.map((imgObj) => imgObj.post_img); // 이미지 URL만 추출
        setPostImages(imageUrls);
      } catch (error) {
        console.error("게시글 이미지 데이터를 불러오는데 실패했습니다.", error);
      }
    };

    fetchPostData();
    fetchPostImages();
  }, [post_no]);

  const handleSubmit = async (formData) => {
    console.log("수정 페이지 제출");
    // FormData 확인용 추후 삭제
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

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
        alert("성공적으로 수정되었습니다.");
        navigate("/home");
      } else {
        alert(
          "입력 파일이나 입력란에 오류가 있습니다. 다시 한번 시도해주세요!",
        );
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      alert("네트워크 오류로 수정에 실패했습니다. 다시 시도해주세요.");
      navigate("/home");
    }
  };

  if (!postData || postImages.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ paddingTop: 50, paddingBottom: 50 }}>
      <Header />
      <PostForm
        isEdit={true}
        initialData={postData}
        initialImages={postImages}
        onSubmit={handleSubmit}
      />
      <Footer />
    </div>
  );
};

export default EditPost;
