import logo from "../logo.svg";
import { useNavigate } from "react-router-dom";
import { getResortsData, uploadResortsData, getUser } from "../aws-funcs.js";

function Home() {
  const navigate = useNavigate();

  const clickSignIn = () => {
    navigate("/signin");
  };
  return (
    <div className="Home">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={clickSignIn}>Sign In</button>
        <button onClick={getResortsData}>get data</button>

      </header>
    </div>
  );
}

export default Home;
