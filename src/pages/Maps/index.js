import React, { useEffect, useState } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Navbar from "../../components/Navbar";
import axios from "axios";
const Maps = () => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location?.coords;

      let config = {
        method: "get",
        maxBodyLength: 10,
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${longitude}%2C${latitude}&radius=1500&type=hospital&key=AIzaSyCSEmsgk2E8Lcq-w_vKCW4eEVAihs6ukeY`,
        headers: {
          Accept: "application/json",
        },
      };

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [location]);

  return (
    <div>
      <Navbar value="Sign-out" />
      <h1 className="text-4xl font-bold px-16">Maps</h1>
      <div className="h-[600px] w-full rounded px-16 py-4">
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
            onGeolocate={(viewport) => {
              setLocation(viewport);
            }}
          />
          {location && (
            <Marker
              longitude={location?.coords.longitude}
              latitude={location?.coords.latitude}
            >
              <div className="bg-red-500 rounded-full h-4 w-4"></div>
            </Marker>
          )}
        </Map>
      </div>
    </div>
  );
};

export default Maps;
