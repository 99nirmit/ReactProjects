import React, { useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import SockJS from "sockjs-client";
import { baseURL } from "../config/AxiosHelper";
import toast from "react-hot-toast";
import {loadMessages} from "../services/RoomServiec.jsx"
import { Stomp } from "@stomp/stompjs";
import { useNavigate } from "react-router";

const ChatPage = () => {
  const { roomId, roomName, connected, setConnected, setRoomId } = useChatContext();
  console.log(roomId);
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [currentUser] = useState("Nirmit");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const navigate = useNavigate();

  //page init
  //messages loading
  //stompClient
  //sendMessage handle

  useEffect(() => {
    const connectWebSocket = () => {
      // Sockjs
      const sock = new SockJS(`${baseURL}/chat`);

      const client = Stomp.over(sock);
      client.connect({}, () => {
        setStompClient(client);

        toast.success("connected");
        console.log(roomId + " before connect");
        
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          console.log(message);

          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };
    if(connected){
      connectWebSocket();
    }
  }, [roomId]);

  const sendMessage = async () => {
    console.log(connected);
    console.log(stompClient);
    console.log(input);
    
    
    if (stompClient && connected && input.trim()) {
      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };

      console.log(message);
      

      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try{
        const messages = await loadMessages(roomId);
        console.log(messages);
        setMessages(messages);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };
    if(connected){
      fetchMessages();
    };
    
  }, [roomId]);

  useEffect(() => {

    if(chatBoxRef.current){
      chatBoxRef.current.scroll({
        top: chatBoxRef.ref.scrollHeight,
        behaviour: "smooth",
      });
    }

  }, [messages]);

  const handleLogout = () => {
    stompClient.disconnected();
    setConnected(false);
    setRoomId("")
    navigate('/')
  }

  return (
    <div className="">
      {/* Header */}
      <header className="dark:border-gray-700 fixed w-full border dark:bg-gray-900 shadow py-5  flex justify-around items-center">
        {/* room name container */}
        <div>
          <h1 className="text -xl font-semibold">
            Room: <span>{roomId}</span>
          </h1>
        </div>
        {/* username container */}
        <div>
          <h1 className="text-xl font-semibold">
            User : <span>{currentUser}</span>
          </h1>
        </div>
        {/* button: leave room */}
        <div>
          <button onClick={handleLogout} className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full">
            Leave Room
          </button>
        </div>
      </header>

      <main ref={chatBoxRef} className="py-20 px-10 w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`my-2 ${
                message.sender === currentUser ? "bg-green-800" : "bg-gray-800"
              } p-2 max-w-xs rounded`}
            >
              <div className="flex flex-row">
                <img
                  className="h-10 w-10 gap-20"
                  src={"https://avatar.iran.liara.run/public/45"}
                  alt=""
                />
                <div className=" flex flex-col gap-1">
                  <p className="text-sm font-bold">{message.sender}</p>
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* input message contanier */}
      <div className="fixed bottom-4 w-full h-16">
        <div className="h-full pr-10 gap-4 flex items-center justify-between rounded w-1/2 mx-auto dark:bg-gray-900">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Type your message here..."
            className="dark:border-gray-700 w-full dark:bg-gray-800 px-5 py-2 rounded-full h-full focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="dark:bg-green-600 h-10 w-10 flex justify-center items-center rounded-full"
          >
            <MdSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
