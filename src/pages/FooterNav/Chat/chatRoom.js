import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

function ChatRoom() {
  const location = useLocation(); // state 에서 post정보 가져오기
  const post = location.state.post;
  const { chat_no } = useParams(); // URL에서 채팅방 ID 추출
  const [chatNo, setChatNo] = useState("");
  const [room, setRoom] = useState("");
  const [socket, setSocket] = useState(null);
  const [myUserToken, setMyUserToken] = useState(
    localStorage.getItem("userToken"),
  );
  const [myNickname, setMyNickname] = useState("");

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

  // 방 정보 세팅 (판매자와 구매자 정보 세팅)
  useEffect(() => {
    setChatNo(chat_no);
    //setMyName(myNickname);
    setPostNo(post.post_no);
    setPostUserNo(post.post_user_no);
    setPostUserNick(post.user_nick);
  }, [chat_no, post]);

  // 한번만 socket.io의 id생성
  useEffect(() => {
    const newSocket = io.connect("http://localhost:5001");
    setSocket(newSocket);

    //테스트용 벙 만들기 (나중에 서버에서 chat_no 받아와서 채팅방 생성(고유값)
    newSocket.on("connect", () => {
      // 방에 참여하기
      newSocket.emit("join_room", chat_no);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [chat_no]);

  // 구매자(나)가 메시지 보내기 (백과 소통)
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        // 보내는 메시지 정보
        chat_no: chat_no, // 채팅방 번호 <- 나중에 지우기 (백에서 받아올것임) 현재는 post_no로 설정됨
        author: myNickname, // 현재 보내는 사람 (나중에 백에서 nickname받아오면 세팅) / 번호로 세팅하기 user_no_2: user_no_2
        message: currentMessage, // 보내는 메시지
        time: formattedTime, // 보낸 시간
        //user_no_2: user_no_2,  // 백에서 유저 번호 알려줘야 보낼 수 있음
        userToken: myUserToken, // 유저번호
        user_no_1: postUserNo, // 판매자 유저번호
      };

      try {
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]); // 내가 보낸 메시지도 이력 남게
        setCurrentMessage(""); // 메시지 전송 후 입력 필드를 클리어
      } catch (err) {
        console.error("통신 연결 오류", err);
      }
    }
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
          <p>대화상대 {postUserNick}</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageConent, index) => {
              // 메시지 하나씩 보이기
              return (
                <div
                  key={index}
                  className="message"
                  id={myNickname === messageConent.author ? "other" : "you"}
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
            placeholder="Heyy..."
            value={currentMessage}
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}> &#9685;</button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
