import "../perfil/perfil.css";
import { FiSearch } from "react-icons/fi";
import { useEffect } from "react";

export function SearchBar({ className, openSearchBar }) {
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

  return (
    <div className={className}>
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
