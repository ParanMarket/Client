import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  Link,
  InputAdornment,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href=".">
        Sook Blule Market
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");
    navigate("/home"); // 홈 이동 테스트용
    try {
      const response = await axios.post("/auth/login", { username, password });
      if (response.dats.success) {
        navigate("/home");
      } else {
        if (response.data.message === "User not found")
          setError("아이디가 존재하지 않습니다. 회원가입을 해주세요.");
        else if (response.data.message === "Invalid password")
          setError("비밀번호가 틀렸습니다.");
        else setError("로그인 실패");
      }
    } catch (error) {
      setError(error, "서버 오류. 로그인 불가");
    }
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            minHeight: "85vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="아이디"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    @sookmyung.ac.kr
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="내 정보 기억하기"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인하기
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgetpwd" variant="body2">
                  비밀번호 찾기
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"회원가입"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
