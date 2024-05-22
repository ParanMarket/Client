import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import { indigo } from "@mui/material/colors";

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #ff4747 !important;
`;

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[500]),
  backgroundColor: indigo[500],
  "&:hover": {
    backgroundColor: indigo[700],
  },
}));

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const Register = () => {
  const theme = createTheme();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  /* 회원 동의 <삭제>
  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };
  */

  const emailCheck = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/auth/email_check/${email}`
      );
      if (response.data.message === "success") {
        setEmailError("");
        return true;
      } else if (response.data.message === "already_exist_email") {
        setEmailError("중복된 이메일입니다. 다른 이메일을 사용해주세요.");
        return false;
      }
    } catch (error) {
      setEmailError("이메일 중복 검사 중 오류 발생" + error);
      return false;
    }
  };

  const nicknameCheck = async (nickname) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/auth/nick_check/${nickname}`
      );
      if (response.data.message === "success") {
        setNicknameError("");
        return true;
      } else if (response.data.message === "already_exist_nick") {
        setNicknameError("중복된 닉네임입니다. 다른 이메일을 사용해주세요.");
        return false;
      }
    } catch (error) {
      setNicknameError("닉네임 검사 중 오류 발생" + error);
      return false;
    }
  };

  const onhandlePost = async (data) => {
    const { email, nickname, password } = data;
    const postData = { email, nickname, password };

    await axios
      .post("http://localhost:5000/auth/register", postData)
      .then(function (response) {
        console.log(response, "성공");
        navigate("/login");
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError("회원가입에 실패하였습니다. 다시한번 확인해 주세요.");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const emailInput = data.get("email").trim(); //사용자 입력 공백 제거
    const fullEmail = `${emailInput}@sookmyung.ac.kr`; // 숙명 이메일 주소
    const isNicknameAvailable = await nicknameCheck(data.get("nickname"));
    const isEmailAvailable = await emailCheck(emailInput);

    if (!isNicknameAvailable || !isEmailAvailable) return;

    const joinData = {
      email: emailInput,
      nickname: data.get("nickname"),
      password: data.get("password"),
      rePassword: data.get("rePassword"),
    };
    const { email, password, rePassword, nickname } = joinData;

    const emailRegex = /^[\w-.]+$/; // 도메인은 @sookmyung.ac.kr로 고정
    if (!emailRegex.test(emailInput))
      setEmailError("올바른 이메일 형식이 아닙니다.");
    else setEmailError("");

    // 비밀번호 유효성 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password)) {
      setPasswordState(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
    } else setPasswordState("");

    // 비밀번호 같은지 체크
    if (password !== rePassword)
      setPasswordError("비밀번호가 일치하지 않습니다.");
    else setPasswordError("");

    // 닉네임 유효성 검사
    const nicknameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nicknameRegex.test(nickname) || nickname.length < 1)
      setNicknameError("올바른 닉네임을 입력해주세요.");
    else setNicknameError("");

    /* 회원가입 동의 체크 <삭제됨>
    if (!checked) alert("회원가입 약관에 동의해주세요.");
    */

    // 다 적었는지 확인
    if (
      emailRegex.test(emailInput) &&
      passwordRegex.test(password) &&
      password === rePassword &&
      nicknameRegex.test(nickname)
    ) {
      onhandlePost(joinData);
      console.log("로그인 페이지로 이동합니다.");
      console.log(joinData);
    } else {
      console.log("One or more conditions failed.");
    }
  };

  return (
    <div className="screen">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            minHeight: "85vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Boxs
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="숙명이메일 주소"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          @sm.ac.kr
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError !== "" || false}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={() => emailCheck(email)}
                    variant="contained"
                    size="large"
                    fullWidth
                  >
                    중복확인
                  </Button>
                </Grid>
                <FormHelperTexts>{emailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    error={passwordState !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordState}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 재입력"
                    error={passwordError !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>
                <Grid item xs={8}>
                  <TextField
                    required
                    fullWidth
                    id="nickname"
                    name="nickname"
                    label="닉네임"
                    error={nicknameError !== "" || false}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={() => nicknameCheck(nickname)}
                    variant="contained"
                    size="large"
                    fullWidth
                  >
                    중복확인
                  </Button>
                </Grid>
                <FormHelperTexts>{nicknameError}</FormHelperTexts>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                회원가입
              </Button>
            </FormControl>
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Boxs>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
