import "../navbar/navbar.css";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";

export function Navbar() {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openPerfilMenu, setOpenPerfilMenu] = useState(false);

  const handleOpenPerfilMenu = () => {
    setOpenPerfilMenu(!openPerfilMenu);
  };

  const handleOpenSearchBar = () => {
    setOpenSearchBar(!openSearchBar);
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

  return (
    <nav className="navbar__container shadow-sm">
      <div className="navbar__logo__container">
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
          </div>
          <FiSearch
            onClick={handleOpenSearchBar}
            className="navbar__search__icon"
          />
        </div>
        <div className="navbar__user__container">
          <div className="navbar__user__icons__container">
            <FaUserCircle
              onClick={handleOpenPerfilMenu}
              className="navbar__user__icon"
            />
            <div className="navbar__icons__menu__container">
              <CgMenuRightAlt className="navbar__user__icon navbar__user__icon__open" />
              <IoClose className="navbar__user__icon navbar__user__icon__close" />
              <div className="navbar__menu__links bg-gray-50 shadow-md">
                <NavLink className="navbar__menu__link"> Categorías</NavLink>
                <NavLink className="navbar__menu__link">
                  Carrito
                  <IoCartOutline className="navbar__menu__link__icon" />
                </NavLink>
              </div>
            </div>
          </div>
          <div className="navbar__user__menu__container ">
            <div className="navbar__user__menu bg-gray-50 shadow-md">
              <NavLink className="navbar__user__menu__link">
                Iniciar sesión
              </NavLink>
              <NavLink className="navbar__user__menu__link">
                Registrarse
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
