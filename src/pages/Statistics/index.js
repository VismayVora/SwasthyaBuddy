import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import AnionsChart from "./AnionsChart";
import CationsChart from "./CationsChart";

const Statistics = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <div className="px-8 py-4">
      <Navbar value="Sign-out" />
      <h1 className="text-3xl font-bold text-[#6B40F9]">Statistics</h1>
      <div className="flex justify-evenly mb-4">
        <div className="flex items-center">
          <div className={`w-[10px] h-[10px] rounded-full bg-[#8884d8]`}></div>
          <h1 className="ml-2">Na</h1>
        </div>
        <div className="flex items-center">
          <div className={`w-[10px] h-[10px] rounded-full bg-[#fa7445]`}></div>
          <h1 className="ml-2">Lactate</h1>
        </div>
        <div className="flex items-center">
          <div className={`w-[10px] h-[10px] rounded-full bg-[#82ca77]`}></div>
          <h1 className="ml-2">K</h1>
        </div>
      </div>
      <div className="flex justify-around">
        <div>
          <h1 className="mb-2 text-lg text-[#3A8EF6]">Your Chart</h1>
          <CationsChart
            Na={location.state.report.Na}
            Lactate={location.state.report.Lactate}
            K={location.state.report.K}
          />
        </div>
        <div>
          <h1 className="mb-2 text-lg text-[#3A8EF6]">Normal Chart</h1>
          <CationsChart Na={120} Lactate={1.35} K={5} />
        </div>
      </div>
      <div className="mt-4 flex justify-evenly mb-4">
        <div className="flex items-center">
          <div className={`w-[10px] h-[10px] rounded-full bg-[#8884d8]`}></div>
          <h1 className="ml-2">Cl</h1>
        </div>
        <div className="flex items-center">
          <div className={`w-[10px] h-[10px] rounded-full bg-[#82ca9d]`}></div>
          <h1 className="ml-2">Lactate</h1>
        </div>
        <div className="flex items-center">
          <div className={`w-[10px] h-[10px] rounded-full bg-[#82ca77]`}></div>
          <h1 className="ml-2">Phos</h1>
        </div>
        <div className="flex items-center">
          <div className={`w-[10px] h-[10px] rounded-full bg-[#00ffff]`}></div>
          <h1 className="ml-2">Prot</h1>
        </div>
        <div className="flex items-center">
          <div className={`w-[10px] h-[10px] rounded-full bg-[#1b4d3e]`}></div>
          <h1 className="ml-2">HCO3</h1>
        </div>
        <div className="flex items-center">
          <div className={`w-[10px] h-[10px] rounded-full bg-[#c3e8de]`}></div>
          <h1 className="ml-2">UnmeasuredAnions</h1>
        </div>
      </div>
      <div className="flex justify-around">
        <div>
          <h1 className="mb-2 text-lg text-[#3A8EF6]">Your Chart</h1>
          <AnionsChart
            Cl={location.state.report.Cl}
            Lactate={location.state.report.Lactate}
            Phos={34}
            Prot={23}
            HCO3={location.state.report.HCO3}
            UnmeasuredAnions={10}
          />
        </div>
        <div>
          <h1 className="mb-2 text-lg text-[#3A8EF6]">Normal Chart</h1>
          <AnionsChart
            Cl={100}
            Lactate={1.35}
            Phos={30}
            Prot={25}
            HCO3={24}
            UnmeasuredAnions={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
