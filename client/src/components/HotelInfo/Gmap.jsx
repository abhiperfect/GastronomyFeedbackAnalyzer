import React, { useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px"
};

const location = {
  lat: 28.645,
  lng: 77.214
};

function Gmap() {
  useEffect(() => {
    const loadMap = async () => {
      if (!window.google || !window.google.maps) {
        // If Google Maps API is not loaded, return early
        console.error("Google Maps JavaScript API not loaded.");
        return;
      }

      // Google Maps API is loaded, import libraries
      const { Map } = await window.google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
      console.log("Maps JavaScript API loaded.");
    };

    loadMap();
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyClC39JhKoNq-xEiM6ENJEsQz4Z6ymwztQ"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={16}
      >
        {/* Add a marker for the location */}
        <Marker position={location} title="8572, Arakashan Road, Paharganj, New Delhi" />
      </GoogleMap>
    </LoadScript>
  )
}

export default Gmap;
