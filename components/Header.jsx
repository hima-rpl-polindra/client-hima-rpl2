import Link from "next/link";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsMoonStars } from "react-icons/bs";
import { FaRegSun } from "react-icons/fa6";

export default function Header() {
  // Dark Mode On Off
  const [darkMode, setDarkMode] = useState(false);
  // Sticky Header State
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // Check local storage for dark mode preference on initial load
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);

    // Scroll event handler for sticky header
    const handleScroll = () => {
      // You can adjust this value based on when you want the header to become sticky
      const scrollThreshold = 50;

      if (window.scrollY > scrollThreshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Apply dark mode styles when darkmode state changes
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  }, [darkMode]);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const router = useRouter();
  // To change text color or underline style on the navbar
  const isHomePage = router.pathname === "/";

  // Navigation list active
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setClicked(false);
  };

  useEffect(() => {
    // Update active link state when the page is reloaded
    setActiveLink(router.pathname);
  }, [router.pathname]);

  // Mobile navbar
  const [mobile, setMobile] = useState(false);

  // Open
  const handleMobileOpen = () => {
    setMobile(!mobile);
  };

  // Close
  const handleMobileClose = () => {
    setMobile(false);
  };

  return (
    <>
      {/* HEADER (NAVIGATION BAR)*/}
      <header
        className={
          isHomePage
            ? `home__header ${isSticky ? "sticky" : ""}`
            : "other__page__header"
        }
      >
        <nav className="container flex items-center justify-between">
          <div className="logo flex gap-2">
            <Link href="/">
              <img src="/img/logo-himarpl.svg" alt="Logo HIMA-RPL POLINDRA" />
            </Link>
          </div>
          <div className="navigation__list flex items-center gap-2">
            <ul className="flex gap-2">
              <li>
                <Link
                  href="/"
                  onClick={() => handleLinkClick("/")}
                  className={activeLink === "/" ? "active" : ""}
                >
                  BERANDA
                </Link>
              </li>
              <li>
                <Link
                  href="/information"
                  onClick={() => handleLinkClick("/information")}
                  className={activeLink === "/information" ? "active" : ""}
                >
                  INFORMASI
                </Link>
              </li>
              <li>
                <Link
                  href="/posting"
                  onClick={() => handleLinkClick("/posting")}
                  className={activeLink === "/posting" ? "active" : ""}
                >
                  KEGIATAN
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  onClick={() => handleLinkClick("/blog")}
                  className={activeLink === "/blog" ? "active" : ""}
                >
                  BLOG
                </Link>
              </li>
            </ul>
            <div className="dark__mode__toggle" onClick={toggleDarkMode}>
              {darkMode ? <BsMoonStars /> : <FaRegSun />}
            </div>
            <div className="mobile__toggle__button" onClick={handleMobileOpen}>
              <HiOutlineBars3BottomRight />
            </div>
          </div>
          <div
            className={
              mobile
                ? "mobile__navigation__list active"
                : "mobile__navigation__list"
            }
          >
            <span
              onClick={handleMobileClose}
              className={mobile ? "active" : ""}
            ></span>
            <div className="mobile__logo">
              <img src="/img/logo-himarpl.svg" alt="logo" />
              <h2>HIMA-RPL</h2>
            </div>
            <ul
              className="flex gap-1 flex-col mt-3"
              onClick={handleMobileClose}
            >
              <li>
                <Link
                  href="/"
                  onClick={() => handleLinkClick("/")}
                  className={activeLink === "/" ? "active" : ""}
                >
                  BERANDA
                </Link>
              </li>
              <li>
                <Link
                  href="/information"
                  onClick={() => handleLinkClick("/information")}
                  className={activeLink === "/information" ? "active" : ""}
                >
                  INFORMASI
                </Link>
              </li>
              <li>
                <Link
                  href="/posting"
                  onClick={() => handleLinkClick("/posting")}
                  className={activeLink === "/posting" ? "active" : ""}
                >
                  KEGIATAN
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  onClick={() => handleLinkClick("/blog")}
                  className={activeLink === "/blog" ? "active" : ""}
                >
                  BLOG
                </Link>
              </li>
            </ul>
            <p>Copyright &copy; 2025 | HIMA-RPL POLINDRA</p>
          </div>
        </nav>
      </header>
    </>
  );
}
