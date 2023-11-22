import React from "react";
import LOGO from "../images/logo-no-background.png"

const Header = () => {
  return (
    <div className="absolute w-screen px-8 bg-gradient-to-b from-black py-2 z-50 flex justify-between">
      <img className="w-28 brightness-150 sm:mx-5 sm:my-10 sm:h-16 sm:w-16" src={LOGO} alt="logo" />
      {/* {user && (
      <div className="flex p-4">
        <img className="w-10 h-10" src={user?.photoURL} />
        <button
          onClick={signOutHandler}
          className="font-bold text-white mx-1 cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    )} */}
    </div>
  );
};

export default Header;
