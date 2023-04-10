import React from 'react'
import { Avatar, Box,Button, FormControl, Paper, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "start",
  paddingLeft:"15px",
  paddingRight:"15px",
  color: theme.palette.text.secondary,
  height: 60,
  fontWeight:"bolder",
  lineHeight: "60px",
}));
const HeadingChatBox=()=>{
  
return (
   <Box className="bg-slate-400 w-full h-1/6 flex px-10 gap-2 justify-center items-center">
     <Avatar className="bg-slate-300 w-14 h-14 " />
     <h2 className="text-3xl font-serif">userId</h2>
   </Box>)
}
const Chats=()=>{
  return (
    <Box className="h-3/4 w-full flex flex-col p-4 overflow-scroll">
      <Item key="efvjioer" className='w-1/3 rounded-3xl mb-2 rounded-bl-none bg-blue-300'  >
        {`Hi this is kunal`}
      </Item>
      <Item key="efvjioer" className='w-1/3 rounded-3xl mb-2 rounded-br-none bg-green-300 self-end'  >
        {`Hi this is kunal`}
      </Item>
      <Item key="efvjioer" className='w-1/3 rounded-3xl mb-2 rounded-bl-none bg-blue-300 '  >
        {`Hi this is kunal`}
      </Item>
      <Item key="efvjioer" className='w-1/3 rounded-3xl mb-2 rounded-br-none bg-green-300 self-end'  >
        {`Hi this is kunal`}
    </Item>
    </Box>
  );

}
const MessageBox=()=>{
  return (
    <form action="POST" className="h-1/12 w-full gap-2 flex justify-center">
      <Box className="h-1/12 w-full gap-2 flex justify-center">
        <TextField
          color="primary"
          className=" justify-end bg-slate-300 caret-cyan-400 font-bold"
          style={{ width: "85%" }}
          sx={{ input: { color: "blue" } }}
          placeholder="type a message..."
        />
        <Box
          className="flex justify-center items-center"
          style={{ width: "10%" }}
        >
          {" "}
          <Button
            type="submit"
            variant="contained"
            className="bg-blue-500 rounded-md flex w-3/4 md:w-full h-10"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Box>
      </Box>
    </form>
  );
}
const Chatbox = () => {
  return (
    <Box className="w-3/4 h-full border-2 ">
      <HeadingChatBox />
      <Chats />
      <MessageBox />
    </Box>
  );
}

export default Chatbox