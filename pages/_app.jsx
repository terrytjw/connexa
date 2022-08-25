/** This page serves as the main entry point for any page in the application. It's like a wrapper or layout that surrounds every other page. */
/** Can be used to add UI components that should be rendered on every page e.g. Navbar, Footer, etc. Also used to manage Auth state on the FE.*/
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
