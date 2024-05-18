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
  FormHelperText,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";

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

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const defaultTheme = createTheme();

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [pwdError, setPwdError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (!email || !password) {
      setLoginError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email: email,
        password: password,
      });
      if (response.data.message === "incorrect_pw") {
        setPwdError("비밀번호가 틀렸습니다.");
      } else if (response.data.message === "undefined_email")
        setLoginError("이메일이 존재하지 않습니다. 회원가입을 해주세요.");
      else if (typeof response.data.message === "number") {
        navigate("/home");
      }
    } catch (error) {
      setLoginError("서버 오류. 로그인 불가");
    }
    //확인용
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperTexts>{loginError}</FormHelperTexts>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperTexts>{pwdError}</FormHelperTexts>
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

export default Login;
