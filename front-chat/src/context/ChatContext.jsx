import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [roomId, setRoomId] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [connected, setConnected] = useState(false);
  console.log(roomId);
  
  
  return (
    <ChatContext.Provider
      value={{
        roomId,
        roomName,
        connected,
        setRoomId,
        setRoomName,
        setConnected,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => useContext(ChatContext);
export default useChatContext;
