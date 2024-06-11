import "../navbar/navbar.css";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { NavBurger } from "../navBurger/NavBurger";
import { Perfil } from "../perfil/Perfil.jsx";
import { SearchBar } from "../searchBar/SearchBar.jsx";

export function Navbar() {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openPerfilMenu, setOpenPerfilMenu] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigate) {
      setOpenPerfilMenu(false);
    }
  }, [navigate]);

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

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <nav className="navbar__container shadow-sm">
      <div className="navbar__logo__container">
        <div className="navbar__logo__section">
          <img
            onClick={handleBackToHome}
            className="navbar__logo__img"
            src="./imgs/aplication/navLogo2.1.png"
            alt=""
          />
          <div className="navbar__search__container">
            <div className="navbar__search__input__container">
              <SearchBar />
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
              <NavBurger
                clicked={clicked}
                setOpenPerfilMenu={setOpenPerfilMenu}
                setOpenSearchBar={setOpenSearchBar}
                isMobile={isMobile}
                setClicked={setClicked}
                setIsMobile={setIsMobile}
              />
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
                <NavLink to="/sing-up" className="navbar__user__menu__link">
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
