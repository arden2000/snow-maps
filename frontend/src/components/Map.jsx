import {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  useMap,
} from "react-map-gl";
import { MapView } from "@aws-amplify/ui-react";
import { useState, useMemo, useRef } from "react";
import RESORTS from "../RESORTS.json";
import MapPopup from "./MapPopup.jsx"

function Map() {
  const mapRef = useRef();

  const [popupInfo, setPopupInfo] = useState(null);

  const pins = useMemo(
    () =>
      RESORTS.map((resort, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={resort.longitude}
          latitude={resort.latitude}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(resort);
          }}
        >
        </Marker>
      )),
    []
  );

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
        {pins}

        {popupInfo && (
          <MapPopup popupInfo={popupInfo} setPopupInfo={setPopupInfo} />
        )}
      </MapView>
    </div>
  );
}

export default Map;
