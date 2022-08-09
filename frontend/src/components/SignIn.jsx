import { Authenticator } from "@aws-amplify/ui-react";
import Main from "./Main.jsx";
import "@aws-amplify/ui-react/styles.css";
import { getUser } from "../aws-funcs.js"
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  console.log(getUser())
  return (
    <div>
      <Authenticator>
        {() => (
          <main>
            {navigate("/")}
          </main>
        )}
      </Authenticator>
    </div>
  );
}

export default SignIn;
