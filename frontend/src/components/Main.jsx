import { useNavigate } from "react-router-dom";
import Upload from "./Upload.jsx";
import Map from "./Map.jsx";
import { getList, getUser } from "../aws-funcs.js";
import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "./Navbar.jsx";

function Main() {
  const [user, setUser] = useState(null);
  if (user === null) {
    getUser().then((result) => {
      setUser(result);
    });
  }
  const navigate = useNavigate();

  if (user === null) {
    <CircularProgress />;
  } else if (user === false) {
    navigate("/signin");
  } else {
    return (
      <div className="Home">
        <Navbar></Navbar>
        <Map></Map>
      </div>
    );
  }
}

export default Main;
