import React, { useEffect, useState } from "react";
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Navbar from "../../components/Navbar";
import axios from "axios";
import qs from "qs";

const Maps = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState(null);
  const [hospital, setHospital] = useState(null);
  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location?.coords;

      let data = qs.stringify({
        lat: latitude,
        lng: longitude,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:4000/api/reports/hospital",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response.data.results);
          setHospitals(response.data.results);
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
            // trackUserLocation={true}
            onGeolocate={(viewport) => {
              setLocation(viewport);
            }}
          />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          {hospitals &&
            hospitals.map((hos) => (
              <Marker
                longitude={hos.geometry.location.lng}
                latitude={hos.geometry.location.lat}
                anchor="bottom"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  console.log(hos);
                  setHospital(hos);
                }}
              >
                <div className="bg-red-500 rounded-full h-4 w-4 p-1">
                  <img src={hos.icon} />
                </div>
              </Marker>
            ))}
          {hospital && (
            <Popup
              anchor="top"
              latitude={hospital.geometry.location.lat}
              longitude={hospital.geometry.location.lng}
              closeButton={true}
              onClose={() => setHospital(null)}
            >
              <h1 className="text-lg font-bold">{hospital.name}</h1>
              <h1 className="text-xs">{hospital.vicinity}</h1>
              {hospital.photos && hospital.photos[0]?.html_attributions.map(
                (attr) => (
                  <div className="text-blue-700" dangerouslySetInnerHTML={{ __html: attr }} />
                )
              )}
            </Popup>
          )}
        </Map>
      </div>
    </div>
  );
};

export default Maps;
