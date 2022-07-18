import { Popup, useMap } from "react-map-gl";
import { useState , useEffect} from "react";
import { getList } from "../aws-funcs.js";
import Upload from "./Upload.jsx";

function MapPopup({ popupInfo, setPopupInfo }) {
  const { current: map } = useMap();
  const [imageList, setImageList] = useState([]);

  const handleGetList = (directory) => {
    getList(directory).then((files) => {
      const fileNames = files.map((file) => file.key);
      setImageList(fileNames);
      console.log(imageList);
    });
  };
  return (
    <Popup
      anchor="center"
      longitude={map.getCenter().lng}
      latitude={map.getCenter().lat}
      onClose={() => {
        setPopupInfo(null);
        setImageList([]);
      }}
      onOpen={() => {
        setImageList([]);
      }}
    >
      <div>
        {popupInfo.name} |{" "}
        <a target="_new" href={`${popupInfo.website}`}>
          Site
        </a>
      </div>
      <img width="100%" src={popupInfo.image} />
      <button onClick={() => handleGetList(popupInfo.name)}>get list</button>
      {imageList.map((image) => (
        <p key={image}>{image} </p>
      ))}
      <Upload location={popupInfo.name} />
    </Popup>
  );
}

export default MapPopup;
