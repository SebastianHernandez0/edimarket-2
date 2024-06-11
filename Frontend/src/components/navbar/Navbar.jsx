import "../navbar/navbar.css";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { NavBurger } from "../navBurger/NavBurger";
import { Perfil } from "../perfil/Perfil.jsx";

export function Navbar() {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openPerfilMenu, setOpenPerfilMenu] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

  const handleOpenPerfilMenu = () => {
    setOpenPerfilMenu(!openPerfilMenu);
    if (isMobile) {
      if (openSearchBar) {
        setOpenSearchBar(false);
      } else if (clicked) {
        setClicked(false);
      }
    }
  };

  const handleOpenSearchBar = () => {
    setOpenSearchBar(!openSearchBar);
    if (openPerfilMenu) {
      setOpenPerfilMenu(false);
    } else if (clicked) {
      setClicked(false);
    }
  };

  useEffect(() => {
    const searchBar = document.querySelector(
      ".navbar__search__input__container"
    );

    if (!openSearchBar) {
      searchBar.classList.add("searchInputActive");
    } else {
      searchBar.classList.remove("searchInputActive");
    }
  }, [openSearchBar]);

  useEffect(() => {
    const perfilMenu = document.querySelector(".navbar__user__menu__container");

    if (!openPerfilMenu) {
      perfilMenu.classList.add("navUserActiveMenu");
    } else {
      perfilMenu.classList.remove("navUserActiveMenu");
    }
  }, [openPerfilMenu]);

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
    <nav className="navbar__container shadow-sm">
      <div className="navbar__logo__container">
        <div className="navbar__logo__section">
          <img
            className="navbar__logo__img"
            src="./imgs/aplication/navLogo2.1.png"
            alt=""
          />
          <div className="navbar__search__container">
            <div className="navbar__search__input__container">
              <input
                placeholder="Buscar producto"
                className="navbar__search__input"
                type="text"
              />
              <FiSearch className="navbar__search__icon navbar__search__icon__insideinput" />
              <FiSearch className="navbar__search__icon__insideinput" />
            </div>
            <FiSearch
              onClick={handleOpenSearchBar}
              className="navbar__search__icon"
            />
          </div>
        </div>

        <div className="navbar__user__container">
          <div className="navbar__user__icons__container">
            <FaUserCircle
              onClick={handleOpenPerfilMenu}
              className="navbar__user__icon"
            />
            <div className="navbar__icons__menu__container">
              <NavBurger clicked={clicked} toggleIcon={toggleIcon} />
              <div
                className={`navbar__menu__links bg-gray-50 shadow-md ${
                  clicked ? "navActiveMenu" : ""
                }`}
              >
                <NavLink className="navbar__menu__link"> Categorías</NavLink>
                <NavLink className="navbar__menu__link">
                  Carrito
                  <IoCartOutline className="navbar__menu__link__icon" />
                </NavLink>
              </div>
            </div>
          </div>
          <div className="navbar__user__menu__container ">
            <Perfil>
              <div className="navbar__user__menu bg-gray-50 shadow-md">
                <NavLink className="navbar__user__menu__link">
                  Iniciar sesión
                </NavLink>
                <NavLink className="navbar__user__menu__link">
                  Registrarse
                </NavLink>
              </div>
            </Perfil>
          </div>
        </div>
      </div>
    </nav>
  );
}
