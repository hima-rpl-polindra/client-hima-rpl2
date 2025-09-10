import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/custom-tailwind.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // import aos css

export default function App({ Component, pageProps }) {
  // AOS animation
  useEffect(() => {
    // initialize aos
    AOS.init({
      // global settings
      disable: false, // accepts following values: phone, tablet, mobile, boolean, expression for function.
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,

      // settings that can be overridden on per-element basis
      offset: 100,
      delay: 0,
      duration: 900,
      easing: "ease",
      once: true,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
  }, []);
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
