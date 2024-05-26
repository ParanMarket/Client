import React, { useState, useEffect } from "react";
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

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const Register = () => {
  const theme = createTheme();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [emailError, setEmailError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [prevEmail, setPrevEmail] = useState("");
  const [prevNickname, setPrevNickname] = useState("");

  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  /* 회원 동의 <삭제>
  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };
  */

  // 이전 이메일 저장
  useEffect(() => {
    if (emailChecked) {
      setPrevEmail(email);
    }
  }, [emailChecked, email]);
  // 이전 닉네임 저장
  useEffect(() => {
    if (nicknameChecked) {
      setPrevNickname(nickname);
    }
  }, [nicknameChecked, nickname]);

  // 이메일 변화 감지
  useEffect(() => {
    setEmailChecked(false);
    setEmailError("");
  }, [email]);

  // 닉네임 변화 감지
  useEffect(() => {
    setNicknameChecked(false);
    setNicknameError("");
  }, [nickname]);

  const emailCheck = async (email) => {
    if (!email) {
      setEmailError("내용을 작성해주세요.");
      return false;
    }

    //유효성 검사
    const emailRegex = /^[\w-.]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      setEmailChecked(false);
      return false;
    }
    try {
      const response = await axios.get(
        `http://localhost:5001/auth/email_check/${email}`
      );
      if (response.data.message === "success") {
        setEmailError("");
        setEmailChecked(true); // 중복 확인 완료
        return true;
      } else if (response.data.message === "already_exist_email") {
        setEmailError("중복된 이메일입니다. 다른 이메일을 사용해주세요.");
        setEmailChecked(false);
        return false;
      }
    } catch (error) {
      setEmailError("이메일 중복 검사 중 오류 발생" + error);
      setEmailChecked(false);
      return false;
    }
  };

  const nicknameCheck = async (nickname) => {
    if (!nickname) {
      setNicknameError("내용을 작성해주세요.");
      return false;
    }
    if (nickname.length < 2 || nickname.length > 11) {
      setNicknameError("2자 ~ 10자의 닉네임을 사용해주세요.");
      setNicknameChecked(false);
      return false;
    }

    //유효성 체크
    const nicknameRegex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]+$/;
    if (!nicknameRegex.test(nickname)) {
      setNicknameError("올바른 닉네임 형식이 아닙니다.");
      setNicknameChecked(false);
      return false;
    }
    try {
      const response = await axios.get(
        `http://localhost:5001/auth/nick_check/${nickname}`
      );
      if (response.data.message === "success") {
        setNicknameError("");
        setNicknameChecked(true); // 중복 확인 완료
        return true;
      } else if (response.data.message === "already_exist_nick") {
        setNicknameError("중복된 닉네임입니다. 다른 닉네임을 사용해주세요.");
        setNicknameChecked(false);
        return false;
      }
    } catch (error) {
      setNicknameError("닉네임 검사 중 오류 발생" + error);
      setNicknameChecked(false);
      return false;
    }
  };

  const onhandlePost = async (data) => {
    const { email, nickname, password } = data;

    try {
      const response = await axios.post("http://localhost:5001/auth/register", {
        email,
        nickname,
        password,
      });
      console.log(response.data, "성공");

      return true;
    } catch (err) {
      console.error("서버와 통신 실패 : ", err);
      throw err; //상위 컴포넌트에 에러 전달
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const emailInput = data.get("email").trim(); //사용자 입력 공백 제거
    const fullEmail = `${emailInput}@sookmyung.ac.kr`; // 숙명 이메일 주소
    const nickname = data.get("nickname").trim();
    const password = data.get("password").trim();
    const rePassword = data.get("rePassword").trim();

    if (!emailInput || !nickname || !password || !rePassword) {
      if (!emailInput) setEmailError("이메일을 작성해주세요.");
      if (!password) setPasswordError("비밀번호를 작성해주세요.");
      if (!rePassword) setRePasswordError("비밀번호 재확인이 필요합니다.");
      if (!nickname) setNicknameError("닉네임을 작성해주세요.");
      return;
    }

    if (!emailChecked || !nicknameChecked) {
      if (!emailChecked) setEmailError("이메일 중복 확인을 해주세요.");
      if (!nicknameChecked) setNicknameError("닉네임 중복 확인을 해주세요.");
      return;
    }

    //비밀번호 유효성 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      return;
    } else setPasswordError("");

    // 비밀번호 같은지 체크
    if (password !== rePassword) {
      setRePasswordError("비밀번호가 일치하지 않습니다.");
      return;
    } else setRePasswordError("");

    const isNicknameAvailable = await nicknameCheck(nickname);
    const isEmailAvailable = await emailCheck(emailInput);

    if (isNicknameAvailable && isEmailAvailable) {
      const joinData = {
        email: emailInput,
        nickname: nickname,
        password: password,
      };
      try {
        await onhandlePost(joinData);
        console.log("회원가입 성공");
        navigate("/login");
      } catch (err) {
        console.error("회원가입 실패", err);
        setRegisterError("회원가입에 실패하였습니다. 다시 시도해주세요.");
      }
    } else {
      setRegisterError("이메일과 닉네임 중복 확인이 필요합니다.");
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
                    disabled={emailChecked && email === prevEmail}
                    sx={{ bgcolor: emailChecked ? "grey.300" : "primary.main" }}
                  >
                    {emailChecked ? "확인 완료" : "중복 확인"}
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
                    error={passwordError !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 재입력"
                    error={rePasswordError !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{rePasswordError}</FormHelperTexts>
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
                    disabled={nicknameChecked && nickname === prevNickname}
                    sx={{
                      bgcolor: nicknameChecked ? "grey.300" : "primary.main",
                    }}
                  >
                    {nicknameChecked ? "확인 완료" : "중복 확인"}
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
                disabled={!emailChecked || !nicknameChecked}
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
