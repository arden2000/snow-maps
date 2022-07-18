import { useNavigate } from "react-router-dom";
import FileInput from "./FileInput.jsx";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

function Upload({location}) {
  const navigate = useNavigate();

  const clickSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="Upload">
      <FileInput directory={location}></FileInput>
    </div>
  );
}

export default Upload;
