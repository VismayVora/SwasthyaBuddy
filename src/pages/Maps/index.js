import React from "react";
import Map, { GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Navbar from "../../components/Navbar";
const Maps = () => {
  return (
    <div><Navbar value="Sign-out"/>
    <div className="h-[400px] w-[400px]">
      <Map
        mapboxAccessToken="pk.eyJ1IjoibWFuYW4xNyIsImEiOiJjbGF0N3pkMGgxdnBhM25udmhuZmVwdzRyIn0.roV1T7xiEcFCXMjCkYJxsg"
        initialViewState={{
          longitude: 77,
          latitude: 28,
          zoom: 5.5,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </Map>
    </div>
    </div>
  );
};

export default Maps;
