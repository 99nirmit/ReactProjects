import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App.jsx";
import ChatPage from "../components/ChatPage.jsx";
import JoinCreateChat from "../components/JoinCreateCHat.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<JoinCreateChat />} />
        <Route path="chat" element={<ChatPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
