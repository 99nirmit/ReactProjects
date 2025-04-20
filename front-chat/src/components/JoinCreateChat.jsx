import React, { useEffect, useState } from "react";
import chatIcon from "../assets/live-chat.png";
import toast from "react-hot-toast";
import {
  createRoom as createRoomApi,
  joinRoomChat,
} from "../services/RoomServiec";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";

const JoinCreateChat = () => {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });

  const { roomId, userName, setRoomId, setCurrentUser, setConnected } =
    useChatContext();

  const navigate = useNavigate();

  const handleFormInputChange = (event) => {
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    if (detail.roomId === "" || detail.userName === "") {
      toast.error("Invalid Input");
      return false;
    }
    return true;
  };

  const createRoom = async () => {
    if (validateForm()) {
      //create room
      try {
        const response = await createRoomApi(detail);
        toast.success("Room Created Successfully !!");

        //Join Room
        setCurrentUser(detail.userName);
        setRoomId(response.data.roomId);
        setConnected(true);
        navigate("/chat");
        console.log(response.data.roomId);
        //forward to chat page
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error("Room Already exits !!");
        } else {
          toast.error("Error in Creating Room");
        }
      }
    }
  };

  const JoinChat = async () => {
    if (validateForm()) {
      // Join chat
      try {
        const room = await joinRoomChat(detail.roomId);
        toast.success("Joined");
        setCurrentUser(detail.userName);
        setRoomId(room.roomId);
        setConnected(true);

        navigate("/chat");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data);
        } else {
          toast.error("Error in Joining Room");
        }
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-10 dark:border-gray-700 border w-full flex flex-col gap-5 max-w-md rounded dark:bg-gray-900 shadow">
        <div>
          <img src={chatIcon} className="w-34 mx-auto" />
        </div>
        <h1 className="text-2xl font-semibold text-center">
          Join Room / Create Room..
        </h1>

        {/* name id div */}
        <div className="">
          <label htmlFor="name" className="block font-medium mb-2">
            Your name
          </label>
          <input
            onChange={handleFormInputChange}
            value={detail.userName}
            type="text"
            id="name"
            name="userName"
            placeholder="Enter the Name"
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* room id div */}
        <div className="">
          <label htmlFor="name" className="block font-medium mb-2">
            Room ID / New Room ID
          </label>
          <input
            name="roomId"
            onChange={handleFormInputChange}
            value={detail.roomId}
            type="text"
            id="name"
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center gap-3 mt-2">
          <button
            onClick={JoinChat}
            className="px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-lg"
          >
            Join Room
          </button>
          <button
            onClick={createRoom}
            className="px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-800 rounded-lg"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateChat;
