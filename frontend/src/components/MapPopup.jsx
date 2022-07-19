import { Popup, useMap } from "react-map-gl";
import { useState, useEffect } from "react";
import { getList, downloadImage, getImageURLs } from "../aws-funcs.js";
import Upload from "./Upload.jsx";
import Button from "@mui/material/Button";

function MapPopup({ popupInfo, setPopupInfo }) {
  const { current: map } = useMap();
  const [imageList, setImageList] = useState([]);
  const [imageURL, setImageURL] = useState([]);

  const handleGetList = (directory) => {
    // getList(directory).then((files) => {
    //   const fileNames = files.map((file) => file.key);
    //   setImageList(fileNames);
    //   console.log(imageList);
    // });
    // for (let i = 0; i < imageList.length; i++) {
    //   downloadImage(imageList[i]).then((url) => {
    //     setImageURL([...imageURL, url]);
    //     console.log(imageURL);
    //   });
    // }
    getImageURLs(directory).then((urls) => {setImageURL(urls); console.log(urls)})
  };
  return (
    <Popup
      anchor="center"
      longitude={map.getCenter().lng}
      latitude={map.getCenter().lat}
      onClose={() => {
        setPopupInfo(null);
        setImageList([]);
        setImageURL([]);
      }}
      onOpen={() => {
        setImageList([]);
        setImageURL([]);
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
      {/* {imageList.map((imageName) => (
        <Button key={imageName} onClick={() => downloadImage(imageName)}>
          {imageName}
        </Button>
      ))} */}
      {imageURL.map((url) => (
        <img key={url} src={url} height={100} width={100} />
      ))}
      <Upload location={popupInfo.name} />
    </Popup>
  );
}

export default MapPopup;
