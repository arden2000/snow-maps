import { useNavigate } from "react-router-dom";
import FileInput from "./FileInput.jsx";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

function Upload({location}) {

  return (
    <div className="Upload">
      <FileInput directory={location}></FileInput>
      {/* <LoadingButton
          onClick={handleClick}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Send
        </LoadingButton> */}
    </div>
  );
}

export default Upload;
