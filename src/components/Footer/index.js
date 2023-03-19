import React from "react";
import logo from "../../assets/logo.png";
const Footer = () => {
  return (
    <div className="px-16 py-8 bg-[#E4FBF9]">
      <div className="flex">
        <div className="flex flex-col justify-center mr-64">
          <img className="w-[50px]" src={logo} />
          <h1 className="font-bold text-2xl text-[#3A8EF6] mt-4">
            Swasthya Buddy
          </h1>
          <h1>One stop solution for all COPD patients</h1>
        </div>
        <div className="flex flex-col justify-center mr-16">
          <h1 className="font-bold text-lg text-[#3A8EF6] mt-4">Features</h1>
          <h1>Determine Disorders</h1>
          <h1>Statistics</h1>
          <h1>COPD Stage detection</h1>
          <h1>COPD Center Locator</h1>
          <h1>Online Consultation</h1>
        </div>
        <div className="flex flex-col justify-center mr-16">
          <h1 className="font-bold text-lg text-[#3A8EF6] mt-4">Contact</h1>
          <h1>About Us</h1>
          <h1>Location</h1>
          <h1>Careers</h1>
          <h1>Blogs</h1>
        </div>
        <div className="flex flex-col justify-center mr-16">
          <h1 className="font-bold text-lg text-[#3A8EF6] mt-4">Contact Us</h1>
          <h1>swasthyabuddy@gmail.com</h1>
          <h1>(+91) 702158080</h1>
          <h1>Ghatkopar, Mumbai, India</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
