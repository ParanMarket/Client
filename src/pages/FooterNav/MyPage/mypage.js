import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  CircularProgress,
} from "@mui/material";
import FooterNav from "../../../components/main/footer";
import Header from "../../../components/main/header";
import moment from "moment";

const Mypage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const userToken = localStorage.getItem("userToken");
  const [userGrade, setUserGrade] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5001/auth/authinfo",
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`, // 헤더에 토큰 추가
            },
          },
        );
        setUserInfo(response.data[0]); // 받아온 사용자 정보 설정
        console.log(response.data[0]);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [userToken]);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.user_grade === 0) {
        setUserGrade("첫눈");
      } else if (userInfo.user_grade === 1) {
        setUserGrade("함박눈");
      } else {
        setUserGrade("만년설");
      }
    }
  }, [userInfo]);

  if (!userInfo) {
    return (
      <div style={{ paddingTop: 50, paddingBottom: 50 }}>
        <Header />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
        <FooterNav />
      </div>
    );
  }

  const sdd_time = moment().diff(moment(userInfo.user_sdd), "days"); // 가입한 날부터 현재까지의 일수 계산

  return (
    <div style={{ paddingTop: 50, paddingBottom: 50 }}>
      <Header />
      <Container maxWidth="md">
        <Box mt={4} mb={4}>
          <Card>
            <CardContent>
              <Grid container spacing={3} alignItems="center">
                <Grid
                  item
                  xs={12}
                  md={4}
                  display="flex"
                  justifyContent="center"
                >
                  <Avatar
                    alt={userInfo.user_nick}
                    src={userInfo.user_avatar}
                    sx={{ width: 120, height: 120 }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="h4" gutterBottom>
                    {userInfo.user_nick}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    이메일: {userInfo.user_email}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    우리가 함께한 날들: {sdd_time}일
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    나의 등급: {userGrade}
                  </Typography>
                  {/* 다른 사용자 정보 필드도 필요한 만큼 추가 */}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Container>
      <FooterNav />
    </div>
  );
};

export default Mypage;
