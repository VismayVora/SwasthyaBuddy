import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import img from "../../assets/DocPatient_2.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const API_URL = "http:localhost:4000/api/auth/register";

  // const API_URL = "http://localhost:4000/api/auth/register";
  const handleSubmitPatient = async (e) => {
    navigate("/signup-patient");
  };
  const handleSubmitDoctor = async (e) => {
    navigate("/signup-doctor");
  };
  return (
    <div>
      <Navbar value="Login" />
      <div className="items-center justify-between py-8 px-16 text-center">
        <div className="w-full">
          <div className="pt-3 ">
            <h1 className="text-3xl font-bold mt-2">
              One Stop Solution for all your{" "}
              <span className="text-[#1678F2]">COPD</span> needs
            </h1>
          </div>

          <div className="w-full">
            <h1 className="text-3xl font-bold m-2 ">Welcome User!</h1>
            <div className="flex flex-col justify-start rounded-xl mt-4 p-5">
              <div className="mt-5 m-auto flex flex-col justify-items-center ">
                <button
                  className="w-full bg-[#1678F2] w-full self-center py-2 rounded-xl font-semibold text-md my-1 text-slate-100 px-10 py-2"
                  onClick={handleSubmitPatient}
                >
                  SignUp as a Patient
                </button>
                <button
                  className="w-full bg-[#1678F2] w-full self-center py-2 rounded-xl font-semibold text-md my-1 text-slate-100 px-10 py-2"
                  onClick={handleSubmitDoctor}
                >
                  SignUp as a Doctor
                </button>
                <h1 className="text-sm font-bold mt-2">
                  If you already have an account,{" "}
                  <span className="text-sm font-bold mt-2 text-[#1678F2]">
                    Login here!
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
