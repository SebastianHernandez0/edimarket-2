import "../navBurger/navBurger.css";
import { useEffect } from "react";

export function NavBurger({
  clicked,
  setClicked,
  setOpenPerfilMenu,
  setOpenSearchBar,
  isMobile,
  setIsMobile,
}) {
  const toggleIcon = () => {
    if (isMobile) {
      setClicked(!clicked);
    }
    if (!clicked) {
      setOpenPerfilMenu(false);
      setOpenSearchBar(false);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 576);
    };
    if (!isMobile) {
      setOpenPerfilMenu(false);
      setOpenSearchBar(true);
    } else {
      setOpenSearchBar(false);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);
  return (
    <div
      className={`nav-icon3 navActiveMenu ${clicked ? "open" : ""}`}
      onClick={toggleIcon}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
