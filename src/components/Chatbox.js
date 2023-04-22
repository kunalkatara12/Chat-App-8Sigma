import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../utils/firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import getOtherEmail from "../../utils/getOtherEmail";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "start",
  paddingLeft: "15px",
  paddingRight: "15px",
  color: theme.palette.text.secondary,
  height: 60,
  fontWeight: "bolder",
  lineHeight: "60px",
}));
const HeadingChatBox = ({ email }) => {
  return (
    <Box className="bg-slate-400 w-full h-1/6 flex px-10 gap-2 justify-center items-center">
      <Avatar className="bg-slate-300 w-14 h-14 " />
      <h2 className="text-3xl font-serif">{email}</h2>
    </Box>
  );
};
// const Chats=(props)=>{
//   const q=query(collection(db,`chats/${props.id}/messages`),orderBy("timestamp"))
//   const [messages] = useCollectionData (q);
//   console.log(messages)
//   const getMessage=()=>{
//     messages?.map(msg=>(
//       // console.log(msg.message)

//         <Item
//           key={Math.random()}
//           className="w-1/3 rounded-3xl mb-2 rounded-bl-none bg-blue-300"
//         >
//          { `${msg.message}`}
//         </Item>

//     ))}

//   return (
//     <Box className="h-3/4 w-full flex flex-col p-4 overflow-scroll">
//   {getMessage()}
//       {/* <Item key="efvjioer" className='w-1/3 rounded-3xl mb-2 rounded-br-none bg-green-300 self-end'  >
//         {`Hi this is kunal`}
//       </Item> */}

//     </Box>
//   );
// }
const MessageBox = ({ id, user }) => {
  const [inpt, setInpt] = useState("");
  console.log(inpt);
  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `chats/${id}/messages`), {
      message: inpt,
      sender: user.email,
      timestamp: serverTimestamp(),
    });
    setInpt("");
  };
  return (
    <form
      action="POST"
      className="h-1/12 w-full gap-2 flex justify-center"
      onSubmit={sendMessage}
    >
      <Box className="h-1/12 w-full gap-2 flex justify-center">
        <TextField
          color="primary"
          className=" justify-end bg-slate-300 caret-cyan-400 font-bold"
          style={{ width: "85%" }}
          sx={{ input: { color: "blue" } }}
          value={inpt}
          placeholder="type a message..."
          onChange={(e) => setInpt(e.target.value)}
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
};
const Chatbox = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);
  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  const [chat] = useDocumentData(doc(db, "chats", id));
  console.log(chat);
  console.log(messages);
  const getMessage = () =>
    messages?.map((msg) => {
      // console.log(msg.message)
      const sender = msg.sender === user.email;

      return (
        <Item
          key={Math.random()}
          className="w-1/3 rounded-3xl mb-2 rounded-bl-none "
          style={{
            alignSelf: `${sender ? "flex-end" : "flex-start"}`,
            backgroundColor: `${
              sender ? " rgb(134 239 172)" : "rgb(191 219 254)"
            }`,
            borderBottomRightRadius: `${sender ? "0px" : "1.5rem"}`,
            borderBottomLeftRadius: `${sender ? "1.5rem" : "0px"}`,
          }}
        >
          {msg.message}
        </Item>
      );
    });

  return (
    <Box className="w-3/4 h-full border-2 ">
      <HeadingChatBox email={getOtherEmail(chat?.users, user)} />
      {/* <Chats id={id} /> */}
      <Box className="h-3/4 w-full flex flex-col p-4 overflow-y-scroll">
        {getMessage()}
      </Box>
      <MessageBox id={id} user={user} />
    </Box>
  );
};

export default Chatbox;
