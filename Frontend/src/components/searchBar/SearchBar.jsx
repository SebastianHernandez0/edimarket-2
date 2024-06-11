import { FiSearch } from "react-icons/fi";

export function SearchBar({ className }) {
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
