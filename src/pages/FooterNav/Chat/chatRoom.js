import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import ChatRoomCard from "../../../components/chatRoomCard";
import { IconButton } from "@mui/material";
import { SendRounded } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import Header from "../../../components/myPage/myPageHeader";

function ChatRoom() {
  const location = useLocation(); // state 에서 post정보 가져오기
  const post = location.state.post;
  const { chat_no } = useParams(); // URL에서 채팅방 ID 추출
  const [chatNo, setChatNo] = useState("");
  const [socket, setSocket] = useState(null);
  const [myUserToken, setMyUserToken] = useState(
    localStorage.getItem("userToken"),
  );
  const [otherNick, setOtherNick] = useState("");

  const [postNo, setPostNo] = useState("");
  const [postUserNo, setPostUserNo] = useState("");
  const [postUserNick, setPostUserNick] = useState("");
  //const [myToken, setMyToken] = useState("");

  const [currentMessage, setCurrentMessage] = useState(""); // 현재 입력창에 있는 내용
  const [messageList, setMessageList] = useState([]); // 메시지 보여지게 쌓는 리스트

  const currentTime = new Date(); // 시간 세팅
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const user_no = jwtDecode(userToken).no;
  const navigate = useNavigate();

  // 채팅방 정보 구성
  useEffect(() => {
    const initializeChatDetails = async () => {
      setPostNo(post.post_no);
      setPostUserNo(post.post_user_no);
      setPostUserNick(post.user_nick);

      try {
        const response = await axios.post(
          "http://localhost:5001/chat/get_chat_details",
          {
            post_no: post.post_no, // 물품 번호
            post_user_no: post.post_user_no, // 등록자 번호
            post_user_nick: post.user_nick, // 등록자 유저 닉네임
          },
          {
            headers: {
              Authorization: `Bearer ${myUserToken}`,
            },
          },
        );

        if (response.data && !chatNo) {
          setChatNo(response.data.chat_no);
          setOtherNick(response.data.user_nick);
        }
      } catch (error) {
        console.log("채팅 통신 오류", error);
        alert("게시자가 물품을 삭제했습니다!");
        navigate("/home");
      }
    };

    initializeChatDetails();
  }, [post, myUserToken, chatNo]);

  // 채팅방 연결
  useEffect(() => {
    if (chatNo) {
      // 히스토리 가져오기
      const fetchChatHistory = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5001/chat/get_chat_history/${chatNo}`,
            {
              headers: {
                Authorization: `Bearer ${myUserToken}`,
              },
            },
          );
          if (response.data) {
            setMessageList(response.data);
          }
        } catch (error) {
          console.log("채팅 기록 불러오기 오류", error);
        }
      };

      fetchChatHistory();

      const newSocket = io.connect("http://localhost:5001");
      setSocket(newSocket);

      newSocket.emit("join_room", chatNo);
      console.log(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [chatNo, myUserToken]);

  // 구매자(나)가 메시지 보내기 (백과 소통)
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        // 보내는 메시지 정보
        chat_no: chatNo, // 채팅방 번호 <- 나중에 지우기 (백에서 받아올것임) 현재는 post_no로 설정됨
        //author: myNickname, // 현재 보내는 사람 (나중에 백에서 nickname받아오면 세팅) / 번호로 세팅하기 user_no_2: user_no_2
        message: currentMessage, // 보내는 메시지
        time: currentTime, // 보낸 시간
        //user_no_2: user_no_2,  // 백에서 유저 번호 알려줘야 보낼 수 있음
        userToken: myUserToken, // 유저번호
        user_no_1: postUserNo, // 판매자 유저번호
        post_no: postNo,
        author: user_no,
      };

      try {
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]); // 내가 보낸 메시지도 이력 남게
        console.log(messageList);
        setCurrentMessage(""); // 메시지 전송 후 입력 필드를 클리어
      } catch (err) {
        console.error("통신 연결 오류", err);
        alert("게시자가 물품을 삭제했습니다!");
        navigate("/home");
      }
    }
  };

  // 판매자(상대방)이 메시지 보내기 (백과 소통)
  useEffect(() => {
    console.log(socket);
    if (socket) {
      const messageListener = (data) => {
        setMessageList((list) => [...list, data]); //이력 남게 만듬 (전에 메시지 + 지금 받은 메시지)
        console.log(messageList);
      };

      socket.on("receive_message", messageListener);
      console.log("Received message:", messageList);

      return () => {
        socket.off("receive_message", messageList);
      };
    }
  }, [socket]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="app_center">
      <div className="chat-window">
        <Header title={otherNick} />
        {/*<div className="chat-header">*/}
        {/*  <p>{otherNick}</p>*/}
        {/*</div>*/}
        <ChatRoomCard post={post} />
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageConent, index) => {
              // 메시지 하나씩 보이기
              return (
                <div
                  key={index}
                  className="message"
                  id={user_no === messageConent.author ? "other" : "you"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageConent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{formatTime(messageConent.time)}</p>
                      {/*<p id="author">{messageConent.author}</p>*/}
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="내용을 작성해주세요."
            value={currentMessage}
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <IconButton onClick={sendMessage}>
            <SendRounded />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
