import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import "../navBurger/navBurger.css";
import { useContext, useEffect } from "react";

export function NavBurger({
  clicked,
  setClicked,
  setOpenPerfilMenu,
  setOpenSearchBar,
  isMobile,
  setIsMobile,
  menuRef,
}) {
  const { setOpenCategories } = useContext(ProductContext);

  const navigate = useNavigate();

  const toggleIcon = () => {
    if (isMobile) {
      setClicked(!clicked);
    }
    if (!clicked) {
      setOpenPerfilMenu(false);
      setOpenSearchBar(false);
    }
    if (clicked) {
      setOpenCategories(false);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 737);
    };
    if (!isMobile) {
      setOpenPerfilMenu(false);
      setOpenSearchBar(true);
      setClicked(false);
      setOpenCategories(false);
    } else {
      setOpenSearchBar(false);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  useEffect(() => {
    if (navigate) {
      setClicked(false);
      setOpenCategories(false);
    }
  }, [navigate]);

  return (
    <div
      ref={menuRef}
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
