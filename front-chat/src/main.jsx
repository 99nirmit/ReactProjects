import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppRoutes from "./config/AppRoutes.jsx";
import { Toaster } from "react-hot-toast";
import { ChatProvider } from "./context/ChatContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Toaster position="top-center" />
      <ChatProvider>
        <AppRoutes />
      </ChatProvider>
    </BrowserRouter>
);
