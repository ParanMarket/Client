import React, { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControl,
    Grid,
    Box,
    Typography,
    Container,
    FormHelperText,
} from "@mui/material/";
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

const NickSetting = () => {
    const [nickname, setNickname ] = useState("");
    const [nicknameChecked, setNicknameChecked ] = useState(false);
    const [prevNickname, setPrevNickname] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [nickSettingError ,setNickSettingError] = useState("");
    const navigate = useNavigate();

    // 닉네임 변화 감지
    useEffect(() => {
        setNicknameChecked(false);
        setNicknameError("");
    }, [nickname]);

    // 닉네임 중복 확인과 유효성 검사 후 POST보내기
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
                alert("사용 가능한 닉네임입니다!")
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nicknameChecked) {
            setNicknameError("닉네임 중복 확인을 해주세요.");
            return;
        }

        const joinData ={ nickname: nickname.trim() }


        try {
            await onhandlePost(joinData);
            console.log("등록되셨습니다!");
            navigate("/home");
        } catch (err) {
            console.error("문제가 생겨 다시 한번 시도해주세요.", err);
            setNickSettingError("문제가 발생했습니다. 다시 시도해주세요.");
        }
    };

    const onhandlePost = async (data) => {
        const { nickname } = data;
        const token = localStorage.getItem("userToken")

        try { // 사용자 닉네임 DB등록
            if (!token) {
                alert("사용자 정보가 존재하지 않습니다. 로그인을 다시 진행해주세요.");
                navigate('/login');
            }
            const response = await axios.post("http://localhost:5001/auth/register", {
                nickname,
            }, {
                headers: { // 검증용 토큰 보내기
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response.data, "성공");
            localStorage.setItem("userNickname", response.data.nickname);

            return true;
        } catch (err) {
            console.error("서버와 통신 실패 : ", err);
            throw err; //상위 컴포넌트에 에러 전달
        }
    };

    // 뒤로 가기 시 토큰 삭제
    useEffect(() => {
        const handlePopState = (event) => {
            localStorage.removeItem("userToken");
        };

        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

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
                        닉네임 설정
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
                                        disabled={nicknameChecked && nickname !== prevNickname}
                                        sx={{
                                            bgcolor: nicknameChecked ? "grey.300" : "primary.main",
                                            width: "100px",
                                        }}
                                    >
                                        {nicknameChecked ? "확인완료" : "중복확인"}
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
                                disabled={!nicknameChecked}
                            >
                                파란장터 시작하기
                            </Button>
                        </FormControl>
                        <FormHelperTexts>{nickSettingError}</FormHelperTexts>
                    </Boxs>
                </Box>
            </Container>
        </div>
    );

}
export default NickSetting