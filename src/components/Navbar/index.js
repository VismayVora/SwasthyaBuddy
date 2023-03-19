import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../src/assets/logo.png";
const Navbar = (props) => {
  const [type, setType] = useState("");
  useEffect(() => {
    const type = localStorage.getItem("user_type");
    console.log(type);
    setType(type);
  }, []);
  const navigate = useNavigate();
  const handleUsers = (e) => {
    if (props.value === "Sign-out") {
      console.log(localStorage.getItem("token"));
      localStorage.clear();
      console.log(localStorage.getItem("token"));
      navigate("/");
    } else {
      navigate(`/${props.value}`);
      console.log("Else was selected");
    }
  };
  return (
    <div className="py-8 px-16 flex items-center justify-between">
      <div className="flex items-center">
        <img className="w-[50px]" src={logo} />
        <h1 className="font-bold text-2xl text-[#3A8EF6] ml-4">
          Swasthya Buddy
        </h1>
      </div>

      <div className="flex justify-around items-center">
        <a href="/" className="text-lg font-semibold pr-5">
          Home
        </a>
        {/* <h1 className="text-lg font-semibold px-10">About Us</h1>
        <h1 className="text-lg font-semibold pl-5">How to use</h1> */}
        {type === "patient" ? (
          <>
            <a href="/reports" className="text-lg font-semibold pl-10">
              Reports
            </a>
          </>
        ) : null}

        {type === "doctor" ? (
          <>
            <a href="/patientlist" className="text-lg font-semibold pl-10">
              Patient List
            </a>
          </>
        ) : null}

        <a href="/acidbase" className="text-lg font-semibold pl-10">
          Disorder Test
        </a>
        <a href="/maps" className="text-lg font-semibold pl-10">
          Center Locator
        </a>
        {type === "patient" ? (
          <>
            <a href="/predict-severity" className="text-lg font-semibold pl-10">
              COPD Test
            </a>
          </>
        ) : null}
      </div>

      {type === "doctor" ? (
        <>
          <a href="/dashboard" className="text-lg font-semibold pl-10">
            Dashboard
          </a>
        </>
      ) : null}

      <div>
        <button
          className="font-bold text-white bg-[#3A8EF6] px-8 py-2 rounded "
          onClick={handleUsers}
        >
          {props.value}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
