import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };
  const API_URL = "http://localhost:4000/api/auth/login";

  const handleOtpSubmit = async (e) => {
    console.log(otp);
    console.log(localStorage.getItem("otp"));
    if (otp === localStorage.getItem("otp")) {
      if (localStorage.getItem("user_type") === "doctor") navigate("/acidbase");
      else {
        navigate("/reports");
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="flex justify-center m-10">
      <div className="text-center">
        <label
          className="text-left font-semibold text-[#201835] text-xl"
          htmlFor="otp"
        >
          Enter OTP
        </label>
        <input
          className="w-full self-center rounded-lg p-1 text-black bg-white border-2 my-2"
          type="number"
          placeholder="Enter OTP"
          id="otp"
          name="otp"
          value={otp}
          onChange={handleOtpChange}
        />
        <button
          className="w-full bg-[#1678F2] w-full self-center py-2 rounded-xl font-semibold text-md my-1 text-slate-100 px-10 py-2"
          onClick={handleOtpSubmit}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Otp;
