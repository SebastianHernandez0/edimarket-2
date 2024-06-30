import "../perfil/perfil.css";
import "../../components/searchBar/searchBar.css";
import { FiSearch } from "react-icons/fi";
import { useContext, useEffect, useRef, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { IoMdClose } from "react-icons/io";

export const SearchBar = forwardRef(({ className, openSearchBar }, ref) => {
  const navigate = useNavigate();
  const { searchProduct, setSearchProduct, products, setFindedProduct } =
    useContext(ProductContext);
  const inputRef = useRef(null);

  const handleSearchProductName = (e) => {
    setSearchProduct(e.target.value);
  };

  useEffect(() => {
    const searchBar = document.querySelector(
      ".navbar__search__input__container"
    );

    const handleResize = () => {
      if (window.innerWidth <= 737 && !openSearchBar) {
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

  const handleSearchProducts = () => {
    const filteredProducts = products.filter((product) =>
      product.nombre.toLowerCase().includes(searchProduct.toLowerCase())
    );
    setFindedProduct(filteredProducts);
    navigate(`/product-name/${searchProduct.toLowerCase()}`);

    if (searchProduct.trim() === "") {
      inputRef.current.focus();
    }
  };

  const handleRemoveContent = () => {
    setSearchProduct("");
  };

  return (
    <div ref={ref} className={`${className} navbar__search__input__container`}>
      <input
        ref={inputRef}
        onChange={handleSearchProductName}
        value={searchProduct}
        placeholder="Buscar producto"
        className="navbar__search__input"
        type="text"
        maxLength="50"
      />
      <FiSearch
        onClick={searchProduct !== "" ? handleSearchProducts : null}
        className="navbar__search__icon navbar__search__icon__insideinput"
      />
      <FiSearch
        onClick={searchProduct !== "" ? handleSearchProducts : null}
        className="navbar__search__icon__insideinput"
      />
      {searchProduct ? (
        <IoMdClose
          onClick={handleRemoveContent}
          className="removecontent__icon"
        />
      ) : (
        ""
      )}
    </div>
  );
});
