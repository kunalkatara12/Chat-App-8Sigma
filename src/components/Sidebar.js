import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { getRedirectResult, signOut } from "firebase/auth";
import { auth, db } from "../../utils/firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { addDoc, collection } from "firebase/firestore";
import getOtherEmail from "../../utils/getOtherEmail";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";

const Sidebar = () => {
  const [newEmail, setNewEmail] = useState("");
  const onSetNewMail = (e) => {
    e.preventDefault();
    setNewEmail(e.target.value);
  };

  const emailExists = (email) =>
    chats?.find(
      (chat) => chat.users.includes(user.email) && chat.users.includes(email)
    );

  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));

  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(chats);

  const router = useRouter();
  const redirect = (id) => {
    router.push(`/chat/${id}`);
  };
  const addNewEmail = async () => {
    if (!emailExists(newEmail) && newEmail != user.email && newEmail != "") {
      await addDoc(collection(db, "chats"), { users: [user.email, newEmail] });
    } else if (newEmail == user.email) {
      alert("This is your email");
    } else if (newEmail === "") {
      alert("enter valid email");
    } else {
      alert(`${newEmail} already exists`);
    }
    setNewEmail("");
  };
  const chatList = () => {
    // if(!getOtherEmail(chat.users,user)){

    return (
      // <ul>
      chats
        ?.filter((chat) => chat.users.includes(user.email))
        .map((chat) => (
          <Box
            key={Math.random()}
            onClick={() => redirect(chat.id)}
            className="flex w-full h-16 rounded-md rounded-l-3xl m-2  items-center gap-3 justify-start hover:bg-slate-200 active:bg-slate-400"
          >
            <Avatar className="bg-slate-300 w-6 h-6 m-2" />
            <h2 className="lg:overflow-hidden sm:overflow-x-scroll md:overflow-x-scroll no-scrollbar">
              {/* {chat.users} */}
              {getOtherEmail(chat.users, user)}
            </h2>
          </Box>
        ))
      // </ul>
    );
  };
  return (
    <div className="h-screen w-1/4 text-lg flex-column ">
      <div className="h-1/6 rounded-md border-4 border-b-gray-400">
        <Box className="flex justify-between items-center">
          <Box className="mx-1 h-full w-1/3 flex flex-col items-center">
            <Box className="flex">
              <Avatar src={user.photoURL} />{" "}
              <Button onClick={() => signOut(auth)}>
                <LogoutIcon />
              </Button>
            </Box>
            <h5
              className="mt-1"
              style={{ fontSize: "15px", fontWeight: "bold" }}
            >
              {user.displayName}
            </h5>
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
                value={newEmail}
                onChange={onSetNewMail}
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
                onClick={addNewEmail}
                style={{ backgroundColor: "grey" }}
                endIcon={<SendIcon className="w-3" />}
              ></Button>
            </Box>
            {/* <Box
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
            </Box> */}
          </Box>
        </Box>
      </div>
      <Box className="h-5/6 overflow-y-scroll pl-3 overflow-x-hidden border-2 flex flex-col px-2 justify-start items-center no-scrollbar">
        {chatList()}
      </Box>
    </div>
  );
};

export default Sidebar;
