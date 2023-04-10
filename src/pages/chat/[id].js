import React from "react";
import Sidebar from "@/components/Sidebar";
import Chatbox from "@/components/Chatbox";
import { Box, Avatar  } from "@mui/material";
import { io } from "socket.io-client";
const socket = io("http://localhost:8000/");
var Id = "";
socket.on("connect", () => {
  Id = `${socket.id}`;
  console.log(`you connected with id=${socket.id}`);
});

const Chat = () => {
  return (
    <>
      <Box className="h-screen flex">
        {" "}
       <Sidebar userId={Id} />
       <Chatbox/>
      </Box>
    </>
  );
};

export default Chat;
