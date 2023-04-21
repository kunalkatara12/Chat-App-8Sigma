import Login from '@/components/Login'
import '@/styles/globals.css'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebaseconfig';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function App({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if(!user)
  {
    return (<Login/>)
  }
  return <Component {...pageProps} />
  // return <Login/>
}
