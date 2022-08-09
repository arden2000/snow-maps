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

function Home() {
  const [clickSignIn, setClickSignIn] = useState(false);
  const navigate = useNavigate();

  // const clickSignIn = () => {
  //   navigate("/signin");
  // };
  return (
    <div className="Home">
      <div>
        <Globe />
        <h2>Welcome</h2>
        <button onClick={() => setClickSignIn(true)}>Sign In</button>
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
              backgroundColor: 'transparent',
              boxShadow: 'none',
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
    </div>
  );
}

export default Home;
