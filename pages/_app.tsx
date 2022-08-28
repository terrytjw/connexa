/** This page serves as the main entry point for any page in the application. It's like a wrapper or layout that surrounds every other page. */
/** Can be used to add UI components that should be rendered on every page e.g. Navbar, Footer, etc. Also used to manage Auth state on the FE.*/
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
};

export default MyApp;
