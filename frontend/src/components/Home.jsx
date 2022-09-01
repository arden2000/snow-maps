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

      }}>
        <h2>SnowGlobe</h2>
        <Globe />
      </Box>
      <Box className="HomeBox2" sx={{
        width: 400,
        height: 600
      }}>
        <p width='50%'>
          An interactive map that allows you to upload images and videos to different ski resorts so you can keep all your memories organized! 
        </p>
        <button onClick={() => setClickSignIn(true)}>Get Started</button>
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
