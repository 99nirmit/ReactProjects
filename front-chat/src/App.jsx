import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router";
import toast from "react-hot-toast";
import JoinCreateChat from "./components/JoinCreateCHat";

const App = () => {

  return (
    
      <div>
       <Outlet/>
      </div>
    
  );
};

export default App;
