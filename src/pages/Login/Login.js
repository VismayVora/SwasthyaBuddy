import React, { useState } from "react";
import img from "../../assets/DocPatient.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = "http://localhost:4000/api/auth/login";

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, { email, password });
      const user = response.data.data;
      console.log(user);
      if (user) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("user_type", response.data.data.user_type);
        localStorage.setItem("otp", response.data.data.otp);
        // localStorage.setItem("doctorid", response.data.data.otp);
        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("email"));
        if (response.data.data.user_type == "doctor") {
          navigate("/otp");
        } else {
          navigate("/otp");
        }
      } else {
        alert("User not found");
      }
    } catch (error) {}
  };

  return (
    <div>
      <Navbar value="SignUp" />
      <div className="flex items-center justify-between py-8 px-16 ">
        <div className="w-full">
          <div className="flex justify-center">
            <img
              src={img}
              alt="Image"
              className="md:w-[25rem] sm:w-[20rem] lg:w-[30rem]"
            />
          </div>
          <div className="pt-3 ">
            <h1 className="text-3xl font-bold mt-2">
              One Stop Solution for all your{" "}
              <span className="text-[#1678F2]">COPD</span> needs
            </h1>
            <h1 className="text-sm font-bold mt-2">
              If you don't have an account you can
            </h1>
            <h1 className="text-sm font-bold mt-2 text-[#1678F2]">
              SignUp here!
            </h1>
          </div>
        </div>

        <div className="w-2/5">
          <h1 className="text-3xl font-bold m-2 ">Welcome User!</h1>
          <div className="flex flex-col justify-start bg-blue-100 rounded-xl mt-4 p-5">
            <div>
              <label
                className="text-left font-semibold text-[#201835] "
                htmlFor="email"
              >
                Email ID
              </label>
              <input
                className="w-full self-center rounded-lg p-1 text-black bg-white border-2 my-2"
                type="email"
                placeholder="Enter Email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <label
                className="text-left font-semibold text-[#201835]"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full self-center rounded-lg p-1 text-black bg-white border-2 my-2"
                type="password"
                placeholder="********"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="mt-5 m-auto flex flex-col justify-items-center ">
              <button
                className="w-full bg-[#1678F2] w-full self-center py-2 rounded-xl font-semibold text-md my-1 text-slate-100 px-10 py-2"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
