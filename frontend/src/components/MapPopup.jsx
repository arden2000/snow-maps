import { Popup, useMap } from "react-map-gl";
import { useState, useEffect } from "react";
import { getImageURLs } from "../aws-funcs.js";
import Upload from "./Upload.jsx";
import Button from "@mui/material/Button";

function MapPopup({ popupInfo, setPopupInfo }) {
  const { current: map } = useMap();
  const [imageList, setImageList] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const handleGetList = (directory) => {
    getImageURLs(directory).then((urls) => {
      setImageURLs(urls);
      console.log(urls);
    });
  };
  return (
    <Popup
      anchor="center"
      longitude={map.getCenter().lng}
      latitude={map.getCenter().lat}
      onClose={() => {
        setPopupInfo(null);
        setImageURLs([]);
      }}
    >
      <div>
        {popupInfo.name} |{" "}
        <a target="_new" href={`${popupInfo.website}`}>
          Site
        </a>
      </div>
      <img width="100%" src={popupInfo.image} />
      <Button onClick={() => handleGetList(popupInfo.name)}>get list</Button>
      {imageURLs.map((url) => (
        <img key={url} src={url} height={100} width={100} />
      ))}
      <Upload location={popupInfo.name} />
    </Popup>
  );
}

export default MapPopup;
