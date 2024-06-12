import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Chatting from "./chatting";
import ScrollToBottom from "react-scroll-to-bottom";

function ChatRoom({ post }) {
  console.log("chatRoom Info:", post);
  const { chat_no } = useParams(); // URL에서 채팅방 ID 추출
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [socket, setSocket] = useState(null);
  // 한번만 socket.io의 id생성
  useEffect(() => {
    const newSocket = io.connect("http://localhost:5001");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const joinRoom = () => {
    setRoom(chat_no);
    if (username !== "" && room !== "" && socket) {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App_chat">
      {!showChat ? (
        <div className="joinChatContainer">
          <h1>채팅방 생성되었습니다: {chat_no}</h1>
          <h3>Join chat</h3>
          <input
            type={"text"}
            placeholder={"User 1...."}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input type={"text"} value={chat_no} />
          <button onClick={joinRoom}> Join A Room </button>
        </div>
      ) : (
        <Chatting socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default ChatRoom;
