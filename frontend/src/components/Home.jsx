import logo from "../logo.svg";
import { useNavigate } from "react-router-dom";
import { getResortsData, uploadResortsData, getUser } from "../aws-funcs.js";
import DottedMap from "dotted-map";
import Box from "@mui/material/Box";

import "./Home.css";
function Home() {
  const navigate = useNavigate();
  const map = new DottedMap({ height: 60, grid: "diagonal" });
  const svgMap = map.getSVG({
    radius: 0.15,
    color: "white",
    shape: "circle",
    // backgroundColor: "white"
  });

  const clickSignIn = () => {
    navigate("/signin");
  };
  return (
    <div className="Home">
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={clickSignIn}>Sign In</button>

      </div>
        <img width="600px"
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          alt=""
        />
    </div>
  );
}

export default Home;
