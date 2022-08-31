import logo from "../logo.svg";
import { useNavigate } from "react-router-dom";
import { getResortsData, uploadResortsData, getUser } from "../aws-funcs.js";
import Box from "@mui/material/Box";
import Globe from "./Globe.jsx";
import "./Home.css";
import Dialog from "@mui/material/Dialog";
import SignIn from "./SignIn.jsx";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Grid from '@mui/material/Grid';

function Home() {
  const [clickSignIn, setClickSignIn] = useState(false);
  const navigate = useNavigate();

  // const clickSignIn = () => {
  //   navigate("/signin");
  // };
  return (
    <div className="Home">
      
      <Box class="HomeBox" sx={{
        width: 600,
        height: 600,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: 'primary.dark',
        // '&:hover': {
        //   backgroundColor: 'primary.main',
        //   opacity: [0.9, 0.8, 0.7],
        // },
      }}>
        <h2>Website Title</h2>
        <Globe />
      </Box>
      <Box class="HomeBox" sx={{
        width: 600,
        height: 600,
        // backgroundColor: 'primary.dark',
        // '&:hover': {
        //   backgroundColor: 'primary.main',
        //   opacity: [0.9, 0.8, 0.7],
        // },
      }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button onClick={() => setClickSignIn(true)}>Sign In</button>
      </Box>

      <Dialog
        open={clickSignIn}
        onClose={() => {
          setClickSignIn(false);
        }}
        maxWidth="sm"
        fullWidth={true}
        scroll="paper"
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        // TransitionComponent={Transition}
      >
        {/* <IconButton
            style={{ alignSelf: "right" }}
            onClick={() => {
              setClickSignIn(false);
            }}
          >
            <CloseIcon color="white"></CloseIcon>
          </IconButton> */}
        <SignIn />
      </Dialog>
    </div>
  );
}

export default Home;
