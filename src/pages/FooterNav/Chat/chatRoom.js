import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import ChatRoomCard from "../../../components/chatRoomCard";
import { IconButton } from "@mui/material";
import { SendRounded } from "@mui/icons-material";

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
  const formattedTime =
    currentTime.getHours().toString().padStart(2, "0") +
    ":" +
    currentTime.getMinutes().toString().padStart(2, "0"); // 시간 표시 형식

  useEffect(() => {
    const initializeChatDetails = async () => {
      setPostNo(post.post_no);
      setPostUserNo(post.post_user_no);
      setPostUserNick(post.user_nick);
      console.log("data: ", post.post_no, post.post_user_no, post.user_nick);

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
          console.log(response.data);
        }
      } catch (error) {
        console.log("채팅 통신 오류", error);
      }
    };

    initializeChatDetails();
  }, [post, myUserToken, chatNo]);

  useEffect(() => {
    if (chatNo) {
      const newSocket = io.connect("http://localhost:5001");
      setSocket(newSocket);

      newSocket.emit("join_room", chatNo);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [chatNo]);

  // 구매자(나)가 메시지 보내기 (백과 소통)
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        // 보내는 메시지 정보
        chat_no: chat_no, // 채팅방 번호 <- 나중에 지우기 (백에서 받아올것임) 현재는 post_no로 설정됨
        //author: myNickname, // 현재 보내는 사람 (나중에 백에서 nickname받아오면 세팅) / 번호로 세팅하기 user_no_2: user_no_2
        message: currentMessage, // 보내는 메시지
        time: formattedTime, // 보낸 시간
        //user_no_2: user_no_2,  // 백에서 유저 번호 알려줘야 보낼 수 있음
        userToken: myUserToken, // 유저번호
        user_no_1: postUserNo, // 판매자 유저번호
        post_no: postNo,
      };

      try {
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]); // 내가 보낸 메시지도 이력 남게
        setCurrentMessage(""); // 메시지 전송 후 입력 필드를 클리어
      } catch (err) {
        console.error("통신 연결 오류", err);
      }
    }
    console.log(messageList);
  };

  // 판매자(상대방)이 메시지 보내기 (백과 소통)
  useEffect(() => {
    if (socket) {
      const messageListener = (data) => {
        console.log("Received message:", data);
        setMessageList((list) => [...list, data]); //이력 남게 만듬 (전에 메시지 + 지금 받은 메시지)
      };

      socket.on("receive_message", messageListener);

      return () => {
        socket.off("receive_message", messageListener);
      };
    }
  }, [socket]);

  return (
    <div className="app_center">
      <div className="chat-window">
        <div className="chat-header">
          <p>대화상대 {otherNick}</p>
        </div>
        {/*<ChatRoomCard post={post} />*/}
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageConent, index) => {
              // 메시지 하나씩 보이기
              return (
                <div
                  key={index}
                  className="message"
                  id={myUserToken === messageConent.userToken ? "other" : "you"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageConent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageConent.time}</p>
                      <p id="author">{messageConent.author}</p>
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
