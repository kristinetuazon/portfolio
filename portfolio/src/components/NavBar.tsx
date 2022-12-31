import React, { useEffect, useState, type ReactNode } from "react";

// interface props {
//     show?: boolean;
//     children: ReactNode;
//     duration?: number;
//     className?: string;
// }

const NavBar = () => {
  return (<>
  <nav>
  <a href="#home">Home</a>
  <a href="#about">About</a>
  <a href="#services">Projects</a>
  <a href="#contact">Contact</a>
</nav>
  </>)
};

export default NavBar;
