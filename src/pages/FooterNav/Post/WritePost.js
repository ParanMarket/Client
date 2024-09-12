import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/main/footer";
import Header from "../../../components/main/header";
import axios from "axios";
import PostForm from "../../../components/post/postForm";

const WritePost = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");

  //서버로 입력 내용 보내기
  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/post/post_write",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`, // Authorization 헤더에 토큰 포함
          },
        },
      );
      if (response.data.message === "success") {
        alert("성공적으로 등록되었습니다.");
        navigate("/home");
      } else {
        alert(
          "입력 파일이나 입력란에 오류가 있습니다. 다시 한번 시도해주세요!",
        );
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      alert("네트워크 오류로 등록에 실패하였습니다. 다시 시도해주세요.");
      navigate("/home");
    }
  };

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

  return (
    <div style={{ paddingTop: 50, paddingBottom: 50 }}>
      <Header />
      <PostForm isEdit={false} onSubmit={handleSubmit} />;
      <Footer />
    </div>
  );
};

export default WritePost;
