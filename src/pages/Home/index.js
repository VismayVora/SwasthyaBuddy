import React from "react";
import Navbar from "../../components/Navbar";
import heart from "../../assets/heart.png";
import doctor from "../../assets/doctor.gif";
import heartrate from "../../assets/heartrate.png";
import location from "../../assets/location.png";
import statistics from "../../assets/charts.png";
import videocall from "../../assets/videocall.jpg";
import lungs from "../../assets/lungs.png";
import ndhm from "../../assets/ndhm.png";
import { BsSearch } from "react-icons/bs/index";
import Blogs from "../../components/Blogs";
const services = [
  {
    id: 1,
    title: "Determine Disorders",
    description:
      "We determine your COPD Disorders and COPD stages from data like ph, CO2, HCO3.",
    image: heartrate,
  },
  {
    id: 2,
    title: "Statistics",
    description:
      "Show different stats of patients current state and past history.",
    image: statistics,
  },
  {
    id: 3,
    title: "COPD Center Locator",
    description: "A map with locations of near by COPD healthcare centers",
    image: location,
  },
  {
    id: 4,
    title: "Online Consultation",
    description:
      "Consultation from Pulmonology expert through video conferencing ",
    image: videocall,
  },
  {
    id: 5,
    title: "COPD Severity Predictor",
    description: "Predicts the 4 severities of COPD",
    image: lungs,
  },
  {
    id: 6,
    title: "Integration with NDHM",
    description: "Seamless sync with Electronic Medical Health Records (EHR)",
    image: ndhm,
  },
];
const Home = () => {
  return (
    <>
      <Navbar value="Login" />
      <div className="py-8 px-16">
        <div className="flex">
          <div>
            <div className="flex font-semibold text-gray-600 border-slate-400 border-solid border rounded-2xl py-[5px] px-[10px] w-fit">
              Health Matters
              <img className="w-[40px] ml-2" src={heart} />
            </div>
            <div className="mt-8">
              <h1 className="text-5xl font-bold text-[#1678F2]">
                One Step Solution
              </h1>
              <h1 className="text-3xl font-bold mt-2">
                For all your queries regarding
              </h1>
              <h1 className="text-3xl font-bold mt-2">COPD</h1>
              <h2 className="mt-2 text-slate-600">
                Using your report values we find various acid base disorders and
                different stages of COPD
              </h2>
            </div>
            <div className="flex justify-between items-center mt-16 p-2 rounded-3xl shadow shadow-slate-500">
              <input
                type="text"
                placeholder="Search a service"
                className="h-[40px] outline-none ml-2"
              />
              <div className="mr-4 bg-[#1678F2] p-2 rounded-full">
                <BsSearch color="white" />
              </div>
            </div>
          </div>
          <div>
            <img src={doctor} className="max-w-[650px]" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-[#1678F2]">
          Services We Provide
        </h1>
        <div className="flex justify-around flex-wrap">
          {services.map((service) => (
            <div
              key={service.id}
              className="min-w-[300px] ml-8 mt-8 max-w-[300px] flex flex-col shadow shadow-slate-500 p-4 rounde-lg"
            >
              <img
                src={service.image}
                className="self-center w-[120px] h-fit"
              />
              <h1 className="mt-4 text-2xl font-bold">{service.title}</h1>
              <h3>{service.description}</h3>
            </div>
          ))}
        </div>
        <Blogs />
      </div>
    </>
  );
};

export default Home;
