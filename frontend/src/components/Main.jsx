import { useNavigate } from "react-router-dom";
import Upload from "./Upload.jsx";
import Map from "./Map.jsx";
import { getResortsData, getUser } from "../aws-funcs.js";
import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "./Navbar.jsx";

function Main({resortInfo}) {
  const [user, setUser] = useState(null);
  if (user === null) {
    getUser().then((result) => {
      setUser(result);
    });
  }
  const navigate = useNavigate();

  if (user === null) {
    return <CircularProgress />;
  } else if (user === false) {
    navigate("/home");
  } else {
    return (
      <div className="Main">
        <Navbar></Navbar>
        {/* <button onClick={getResortsData}>get data</button> */}
        <Map></Map>
      </div>
    );
  }
}

export default Main;
