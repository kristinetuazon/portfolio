import { type AppType } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Cursor from "../components/Cursor";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => (
  <div>
    <Cursor />
    <Analytics />
    <Component {...pageProps} />
  </div>
);

export default MyApp;
