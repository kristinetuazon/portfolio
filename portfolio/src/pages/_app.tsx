import { type AppType } from "next/app";
import { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion"
import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
const springConfig = { damping: 25, stiffness: 700 };
const cursorXSpring = useSpring(cursorX, springConfig);
const cursorYSpring = useSpring(cursorY, springConfig);
  useEffect(() => {
    const moveCursor = (e:MouseEvent) => {cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)}
    window.addEventListener('mousemove', moveCursor)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [])

  return (
    <div>
     <motion.div
  className="cursor"
  style={{
    translateX: cursorXSpring,
    translateY: cursorYSpring,
  }}
/>
      <Component {...pageProps} />
    </div>
  );
};

export default trpc.withTRPC(MyApp);
