import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="pt-6 pb-2 w-full ">  
      <div className="text-center font-light px-6 pb-2">
        Asset Management System
      </div>
      <div className="bg-gray-100 text-center gap-2  w-full px-6 pb-4">
        <a href='/meet-developers' target="_blank"    className=" text-sm font-bold underline text-my-blue ">COPYRIGHT Reserved @ BINARY HUB, {new Date().getFullYear()}</a> 
      </div>
    </div>
  );
};

export default Footer;
