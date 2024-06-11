import "../navbar/navbar.css";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

export function Navbar() {
  const [openSearchBar, setOpenSearchBar] = useState(false);

  const handleOpenSearchBar = () => {
    setOpenSearchBar(!openSearchBar);
  };

  useEffect(() => {
    const searchBar = document.querySelector(".navbar__search__input__container");

    if (openSearchBar) {
      searchBar.classList.add("searchInputActive");
    } else {
      searchBar.classList.remove("searchInputActive");
    }
  }, [openSearchBar]);

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
              placeholder="Busca un producto"
              className="navbar__search__input"
              type="text"
            />
          </div>
          <FiSearch
            onClick={handleOpenSearchBar}
            className="navbar__search__icon"
          />
        </div>
        <div className="navbar__user__container">
          <div className="navbar__user__icons__container">
            <FaUserCircle className="navbar__user__icon" />
            <div className="navbar__icons__menu__container">
              <CgMenuRightAlt className="navbar__user__icon navbar__user__icon__open" />
              <IoClose className="navbar__user__icon navbar__user__icon__close" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
