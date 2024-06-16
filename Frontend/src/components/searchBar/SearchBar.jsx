import "../perfil/perfil.css";
import "../../components/searchBar/searchBar.css";
import { FiSearch } from "react-icons/fi";
import { useEffect } from "react";

export function SearchBar({ className, openSearchBar }) {
  useEffect(() => {
    const searchBar = document.querySelector(
      ".navbar__search__input__container"
    );

    const handleResize = () => {
      if (window.innerWidth <= 576 && !openSearchBar) {
        searchBar.classList.add("searchInputActive");
      } else {
        searchBar.classList.remove("searchInputActive");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [openSearchBar]);

  return (
    <div className={`${className} navbar__search__input__container`}>
      <input
        placeholder="Buscar producto"
        className="navbar__search__input"
        type="text"
      />
      <FiSearch className="navbar__search__icon navbar__search__icon__insideinput" />
      <FiSearch className="navbar__search__icon__insideinput" />
    </div>
  );
}
