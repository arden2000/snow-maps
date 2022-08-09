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
import { getImageURLs } from "../aws-funcs.js";
import Upload from "./Upload.jsx";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Zoom from "@mui/material/Zoom";
import DialogTitle from "@mui/material/DialogTitle";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import ImageGallery from "./ImageGallery.jsx";
import CloseIcon from "@mui/icons-material/Close";
import Hidden from '@mui/material/Hidden';


const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

function Map() {
  const mapRef = useRef();
  const [popupInfo, setPopupInfo] = useState(null);
  const [resortInfo, setResortInfo] = useState(null);
  const [images, setImages] = useState([]);

  if (resortInfo === null || resortInfo === undefined) {
    getResortsData().then((result) => {
      setResortInfo(result);
    });
  }

  const handleGetList = (directory) => {
    getImageURLs(directory).then((imageList) => {
      setImages(imageList);
      console.log(imageList);
    });
  };

  if (resortInfo === null || resortInfo === undefined) {
    return <CircularProgress />;
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
                handleGetList(resort.name)
              }}
            />
          ))}
          <Dialog
            open={popupInfo != null}
            onClose={() => {
              setPopupInfo(null);
              setImages([]);
            }}
            maxWidth="md"
            fullWidth={true}
            scroll="paper"
            TransitionComponent={Transition}
          >
            {popupInfo && (
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}>
                  <Hidden><CloseIcon sx={{color: "white"}}></CloseIcon></Hidden>
                    <DialogTitle
                    style={{
                      alignSlef: "center",
                    }}>
                      <Link
                        href={`${popupInfo.website}`}
                        target="_new"
                        underline="none"
                      >
                        {popupInfo.name}
                      </Link>
                    </DialogTitle>
                    <IconButton
                      style={{alignSelf: "right"}}
                      onClick={() => {
                        setPopupInfo(null);
                        setImages([]);
                      }}
                    >
                      <CloseIcon color="white"></CloseIcon>
                    </IconButton>
                </div>
                <Upload location={popupInfo.name} />
                {/* <Button onClick={() => handleGetList(popupInfo.name)}>
                  Show Images
                </Button> */}
                <ImageGallery itemData={images} />
                {/* {images.map((image) => (
                  <img key={image.key} src={image.url} height={100} width={100} />
                ))} */}
              </Box>
            )}
          </Dialog>
        </MapView>
      </div>
    );
  }
}

export default Map;
