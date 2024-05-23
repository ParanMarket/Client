import React from "react";
import { useParams } from "react-router-dom";

function ChatRoom() {
  const { chatRoomId } = useParams(); // URL에서 채팅방 ID 추출

  return (
    <div>
      <h1>채팅방 생성되었습니다: {chatRoomId}</h1>
    </div>
  );
}

export default ChatRoom;
