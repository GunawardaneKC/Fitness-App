import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png"; //
const Navbar = ({ user }) => {
  return (
    <div className="bg-black flex w-full h-[70px] z-50">
      <div className="flex items-center justify-between w-full px-4">
       <div className="">
    <img src={logo} alt="logo" className="w-30 h-16  shadow-lg p-2" />
    </div>
        <Link to={`/profile/${user?.id}`} className="flex items-center">
    <img
        src={user?.profileImage}
        alt="profile"
        className="w-[40px] h-[40px] rounded-full border-4 border-pink-500"
    />
    {/* <div className="text-white text-sm font-semibold">Login</div>
    <div className="text-white text-sm font-semibold ml-6">Register</div> */}
</Link>
      </div>
    </div>
  );
};
export default Navbar;
