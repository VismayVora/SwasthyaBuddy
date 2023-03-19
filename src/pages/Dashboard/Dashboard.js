import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "../../components/Chart/Chart";
import Navbar from "../../components/Navbar";

const Dashboard = () => {
  const [avgValues, setAvgValues] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await axios.post(
      "http://localhost:4000/api/dashboard/all"
    );
    console.log(response);
    setAvgValues(response.data.data);
  };
  return (
    <div>
      <Navbar value="Sign-out" />
      <div className="flex justify-center mt-2">
        <h1 className="text-[#1678F2] text-2xl font-bold pb-5">
          COPD Patients
        </h1>
      </div>
      <Chart />
      <div className="flex justify-center  mt-10">
        <h1 className="text-[#1678F2] text-2xl font-bold">Average Analysis</h1>
      </div>
      <div className="flex justify-center pt-5 pb-8">
        <div className="rounded-lg p-7 drop-shadow-md bg-[#FFFFFF] my-4 mx-4">
          <h2 className="text-[#1678F2] text-xl">Average CO2 levels</h2>
          <h6 className="text-md">{avgValues?.avgCO2.toFixed(2)}</h6>
        </div>
        <div className="rounded-lg p-6 drop-shadow-md bg-[#FFFFFF] my-4 mx-4">
          <h2 className="text-[#1678F2] text-xl">Average pH levels</h2>
          <h6 className="text-md">{avgValues?.avgPh.toFixed(2)}</h6>
        </div>
        <div className="rounded-lg p-6 drop-shadow-md bg-[#FFFFFF] my-4 mx-4">
          <h2 className="text-[#1678F2] text-xl">Average HCO3 levels</h2>
          <h6 className="text-md">{avgValues?.avgHCO3.toFixed(2)}</h6>
        </div>
        <div className="rounded-lg p-6 drop-shadow-md bg-[#FFFFFF] my-4 mx-4">
          <h2 className="text-[#1678F2] text-xl">Average Na levels</h2>
          <h6 className="text-md">{avgValues?.avgNa.toFixed(2)}</h6>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
