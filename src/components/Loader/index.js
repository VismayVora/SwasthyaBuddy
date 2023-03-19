// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Dna } from "react-loader-spinner";

import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center flex-1 h-[500px] w-screen">
      <Dna
        visible={true}
        height="100"
        width="100"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loader;
