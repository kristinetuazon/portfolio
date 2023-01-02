import React, { useEffect, useState, type ReactNode } from "react";


const NavBar = () => {
  return (<>
  <nav className="flex fixed bottom-0 inset-x-0 z-999999 w-100 justify-evenly ">
  <div className="grid grid-cols-4 gap-4 ">
  <a className="text-white font-audreyMedium inset-y-0 left-0 uppercase" href="#name">Start</a>
  <a className="text-white font-audreyMedium uppercase" href="#about">About</a>
  <a className="text-white font-audreyMedium uppercase" href="#projects">Project</a>
  <a className="text-white font-audreyMedium uppercase inset-0 " href="#contact">Contact</a>
  </div>
</nav>
  </>)
};

export default NavBar;
