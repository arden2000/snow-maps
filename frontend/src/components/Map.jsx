import {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import { MapView } from "@aws-amplify/ui-react";
import { useState, useRef, forwardRef } from "react";
import { getResortsData } from "../aws-funcs.js";
import CircularProgress from "@mui/material/CircularProgress";
import ResortRodal from "./ResortRodal.jsx";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { getImageURLs } from "../aws-funcs.js";
import Upload from "./Upload.jsx";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Zoom from "@mui/material/Zoom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

function Map() {
  const mapRef = useRef();
  const [popupInfo, setPopupInfo] = useState(null);
  const [resortInfo, setResortInfo] = useState(null);
  const [imageURLs, setImageURLs] = useState([]);

  if (resortInfo === null || resortInfo === undefined) {
    getResortsData().then((result) => {
      setResortInfo(result);
    });
  }

  const handleGetList = (directory) => {
    getImageURLs(directory).then((urls) => {
      setImageURLs(urls);
      console.log(urls);
    });
  };

  if (resortInfo === null || resortInfo === undefined) {
    return <CircularProgress></CircularProgress>;
  } else {
    return (
      <div className="Map">
        <MapView
          ref={mapRef}
          initialViewState={{
            latitude: 39.8283,
            longitude: -95.5795,
            zoom: 4,
          }}
        >
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ScaleControl />
          {resortInfo.map((resort, index) => (
            <Marker
              key={`marker-${index}`}
              longitude={resort.longitude}
              latitude={resort.latitude}
              anchor="bottom"
              onClick={(e) => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                setPopupInfo(resort);
              }}
            />
          ))}
          <Dialog
            open={popupInfo != null}
            onClose={() => {
              setPopupInfo(null);
              setImageURLs([]);
            }}
            maxWidth="xs"
            scroll="paper"
            TransitionComponent={Transition}
          >
            {popupInfo && (
              <Box>
                <div>
                  {popupInfo.name} |{" "}
                  <a target="_new" href={`${popupInfo.website}`}>
                    Site
                  </a>
                </div>
                <img src={popupInfo.image} height={100} width={100} />
                <Button onClick={() => handleGetList(popupInfo.name)}>
                  get list
                </Button>
                {imageURLs.map((url) => (
                  <img key={url} src={url} height={100} width={100} />
                ))}
                <Upload location={popupInfo.name} />
              </Box>
            )}
          </Dialog>
          {/* <Rodal
            visible={popupInfo != null}
            onClose={() => setPopupInfo(null)}
            height={500}
            animation="door"
          >
            {popupInfo && (
              <>
                <div>
                  {popupInfo.name} |{" "}
                  <a target="_new" href={`${popupInfo.website}`}>
                    Site
                  </a>
                </div>
                <img width="100%" src={popupInfo.image} />
                <Button onClick={() => handleGetList(popupInfo.name)}>
                  get list
                </Button>
                {imageURLs.map((url) => (
                  <img key={url} src={url} height={100} width={100} />
                ))}
                <Upload location={popupInfo.name} />
              </>
            )}
          </Rodal> */}
        </MapView>
      </div>
    );
  }
}

export default Map;
