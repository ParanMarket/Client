import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chatting({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [otherUser, setOtherUser] = useState("");

  const currentTime = new Date();
  const formattedTime =
    currentTime.getHours().toString().padStart(2, "0") +
    ":" +
    currentTime.getMinutes().toString().padStart(2, "0");

  // 내가 메시지 보내기
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        // 보내는 메시지 정보
        room: room, // 채팅방 번호
        author: username, // 현재 보내는 사람 username
        message: currentMessage, // 보내는 메시지
        time: formattedTime, // 보낸 시간
      };

      try {
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]); // 내가 보낸 메시지도 이력 남게
        setCurrentMessage(""); // 메시지 전송 후 입력 필드를 클리어
      } catch (err) {
        console.err("통신 연결 오류", err);
      }
    }
  };

  // 통신 연결 (상대방이 보내는 메시지 받기)
  useEffect(() => {
    if (socket) {
      const messageListener = (data) => {
        setMessageList((list) => [...list, data]); //이력 남게 만듬 (전에 메시지 + 지금 받은 메시지)
        setOtherUser(data.author);
      };

      socket.on("receive_message", messageListener);

      return () => {
        socket.off("receive_message", messageListener);
      };
    }
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>상대방 {otherUser}</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageConent) => {
            // 메시지 하나씩 보이기
            return (
              <div
                className="message"
                id={username === messageConent.author ? "other" : "you"}
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
  );
}

export default Chatting;
