import React from "react";
import Navbar from "../../components/Navbar";
const Video = () => {
  return (
    <div>
      <Navbar vslue="Sign-out"/>
      <iframe
        src="https://mentorgrowth.daily.co/ORaUFBLzqxSFHwfUAx58"
        allow="camera; microphone; fullscreen; speaker; display-capture"
        style={{ height: "700px", width: "100%" }}
      ></iframe>
    </div>
  );
};

export default Video;
