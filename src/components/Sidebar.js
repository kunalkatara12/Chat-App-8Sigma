import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Avatar } from '@mui/material';

const Chat=()=>{

  return (
    <Box  className="flex w-full h-16 rounded-md rounded-l-3xl m-2  items-center gap-3 justify-start hover:bg-slate-200 active:bg-slate-400">
      <Avatar className="bg-slate-300 w-6 h-6 m-2" />
      <h2>UserId</h2>
    </Box>
  );
}
const Sidebar = (props) => {

const [personalId, setPersonalId] = useState("");
useEffect(()=>{
  setPersonalId(props.userId);
},[])
  let chatList=[];
 for (let index = 0; index < 30; index++) {
chatList.push(<Chat/>);
  }
  return (
    <div className="h-screen w-1/4 text-lg flex-column ">
      <div className="h-1/6 rounded-md border-4 border-b-gray-400">
        <Box className="flex justify-between items-center">
          <Box className="mx-1 h-full w-1/3 flex flex-col items-center">
            <Avatar />
            <h5 className="mt-1" style={{fontSize:"10px", fontWeight:"bold"}} >{personalId}</h5>
          </Box>
          <Box>
            {" "}
            <Box
              className="m-1 flex"
              component="form"
              sx={{
                m: 1,
                width: "250",
                color: "black",
              }}
              noValidate
              autoComplete="on"
            >
              <TextField
                id="outlined-basic"
                type="email"
                label=""
                className="mx-2"
                variant="outlined"
                size="small"
              />
              <Button
                variant="contained"
                size="small"
                style={{ backgroundColor: "grey" }}
                endIcon={<SendIcon className="w-3" />}
              ></Button>
            </Box>
            <Box
              className="m-1 flex"
              component="form"
              sx={{
                m: 1,
                width: "250",
                color: "black",
              }}
              noValidate
              autoComplete="on"
            >
              <TextField
                id="outlined-basic"
                label=""
                className="mx-2"
                variant="outlined"
                size="small"
              />
              <Button
                variant="contained"
                size="small"
                style={{ backgroundColor: "green" }}
                endIcon={<HowToRegIcon />}
              ></Button>
            </Box>
          </Box>
        </Box>
      </div>
      <Box className="h-5/6 overflow-y-scroll pl-3 overflow-x-hidden border-2 flex flex-col px-2 justify-start items-center">
        {chatList}
      </Box>
    </div>
  );
}

export default Sidebar