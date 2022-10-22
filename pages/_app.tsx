/** This page serves as the main entry point for any page in the application. It's like a wrapper or layout that surrounds every other page. */
/** Can be used to add UI components that should be rendered on every page e.g. Navbar, Footer, etc. Also used to manage Auth state on the FE.*/
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/Context";
import { useUserData } from "../lib/hooks";
import type { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const userData = useUserData();

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={router.route}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={{
          hidden: { x: 500, opacity: 0 },
          visible: { x: 0, opacity: 1, transition: { duration: 1 } },
          exit: { x: -500, opacity: 0, transition: { duration: 1 } },
        }}
      >
        <UserContext.Provider value={userData}>
          <Navbar />
          <Component {...pageProps} />
          <Toaster />
        </UserContext.Provider>
      </motion.div>
    </AnimatePresence>
  );
};

export default MyApp;
