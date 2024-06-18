import "../navbar/navbar.css";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState, useRef, forwardRef, useContext } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { NavBurger } from "../navBurger/NavBurger";
import { Perfil } from "../perfil/Perfil.jsx";
import { SearchBar } from "../searchBar/SearchBar.jsx";
import { ProductContext } from "../../context/ProductContext.jsx";
import { UserContext } from "../../context/UserContext.jsx";
import { CartContext } from "../../context/CarritoContext.jsx";
import { Categories } from "../categories/Categories.jsx";
import { BurgerCategories } from "../burgerCategories/BurgerCategories.jsx";
import { CiUser } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";

// Crear un componente envolvente para manejar la referencia
const UserIcon = forwardRef((props, ref) => (
  <div ref={ref}>
    <FaUserCircle {...props} />
  </div>
));

export function Navbar() {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openPerfilMenu, setOpenPerfilMenu] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);
  const navigate = useNavigate();
  const perfilButtonRef = useRef(null);
  const perfilMenuRef = useRef(null);
  const menuRef = useRef(null);
  const navbarRef = useRef(null);
  const menuContainerRef = useRef(null);
  const { setOpenCategories } = useContext(ProductContext);
  const categoriesBtnRef = useRef(null);
  const { userToken } = useContext(UserContext);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    if (navigate) {
      setOpenPerfilMenu(false);
      setOpenSearchBar(false);
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

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleClickOutside = (event) => {
    if (
      categoriesBtnRef.current &&
      !categoriesBtnRef.current.contains(event.target)
    ) {
      setOpenCategories(false);
    }

    if (
      menuRef.current &&
      menuContainerRef.current &&
      !menuRef.current.contains(event.target) &&
      !menuContainerRef.current.contains(event.target)
    ) {
      setClicked(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleButtonClick = (event) => {
    event.stopPropagation(); // Detener la propagación del evento
    setOpenCategories((prev) => !prev);
  };

  useEffect(() => {
    const navbar = navbarRef.current;

    if (navbar) {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          navbar.classList.add("navbarScroll");
        } else {
          navbar.classList.remove("navbarScroll");
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <nav ref={navbarRef} className="navbar__container shadow-sm">
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
              <SearchBar openSearchBar={openSearchBar} />
            </div>
            <FiSearch
              onClick={handleOpenSearchBar}
              className="navbar__search__icon"
            />
          </div>
        </div>

        <div className="navbar__user__container">
          <div className="navbar__user__icons__container">
            <UserIcon
              ref={perfilButtonRef}
              onClick={handleOpenPerfilMenu}
              className="navbar__user__icon "
            />
            <div className="navbar__icons__menu__container">
              <NavBurger
                clicked={clicked}
                setOpenPerfilMenu={setOpenPerfilMenu}
                setOpenSearchBar={setOpenSearchBar}
                isMobile={isMobile}
                setClicked={setClicked}
                setIsMobile={setIsMobile}
                menuRef={menuRef}
              />
              <div
                ref={menuContainerRef}
                className={`navbar__menu__links  ${
                  clicked ? "navActiveMenu" : ""
                }`}
              >
                {userToken ? (
                  <div className="navbar__perfil__desktop w-full">
                    <h1 className="mb-3 font-medium">¡Bienvenido!</h1>
                    <NavLink
                      to="miperfil"
                      className="navbar__menu__link navbar__menu__link__mobile"
                    >
                      <CiUser className="miperfil__icon" />
                      Mi perfil
                    </NavLink>
                    <NavLink
                      to="/favorites"
                      className="navbar__menu__link navbar__menu__link__mobile"
                    >
                      <CiHeart className="miperfil__icon" />
                      Favoritos
                    </NavLink>
                    <NavLink
                      to=""
                      className="navbar__menu__link navbar__menu__link__mobile"
                    >
                      Cerrar sesión
                    </NavLink>
                    <hr className="mt-2" />
                  </div>
                ) : (
                  <div className="navbar__perfil__desktop">
                    <NavLink
                      to="/sing-in"
                      className="navbar__menu__link navbar__menu__link__mobile"
                    >
                      Iniciar sesión
                    </NavLink>
                    <NavLink
                      to="/sing-up"
                      className="navbar__menu__link navbar__menu__link__mobile"
                    >
                      Registrarse
                    </NavLink>
                  </div>
                )}
                <div className="navbar__categories__container">
                  <NavLink
                    ref={categoriesBtnRef}
                    onClick={handleButtonClick}
                    className="navbar__menu__link navbar__menu__link__display"
                  >
                    Categorías
                  </NavLink>
                  <Categories className="categories__display" />
                </div>
                <p className="categories__title font-medium text-lg">Categorías</p>
                <BurgerCategories className="burger-categories" />
                <NavLink
                  to="/carro"
                  className="navbar__menu__link navbar__menu__link__cart"
                >
                  Carrito
                  <img
                    className="navbar__menu__link__icon"
                    src={
                      cart.length > 0
                        ? "/imgs/aplication/cart_full.png"
                        : "/imgs/aplication/cart_empty.png"
                    }
                    alt=""
                  />
                  {cart.length > 0 ? (
                    <p className="cart__products__indicater">{cart.length}</p>
                  ) : (
                    ""
                  )}
                </NavLink>
              </div>
            </div>
          </div>
          <div className="navbar__user__menu__container" ref={perfilMenuRef}>
            {userToken ? (
              <Perfil
                className="navbar__perfil__container"
                openPerfilMenu={openPerfilMenu}
                setOpenPerfilMenu={setOpenPerfilMenu}
                perfilMenuRef={perfilMenuRef}
                perfilButtonRef={perfilButtonRef}
              >
                <div className="navbar__user__menu bg-gray-50 shadow-md">
                  <NavLink to="miperfil" className="navbar__user__menu__link">
                    Mi perfil
                  </NavLink>
                  <NavLink to="" className="navbar__user__menu__link">
                    Publicar
                  </NavLink>
                  <NavLink to="/favorites" className="navbar__user__menu__link">
                    Favoritos
                  </NavLink>
                  <NavLink to="" className="navbar__user__menu__link">
                    Cerrar sesión
                  </NavLink>
                </div>
              </Perfil>
            ) : (
              <Perfil
                className="navbar__perfil__container"
                openPerfilMenu={openPerfilMenu}
                setOpenPerfilMenu={setOpenPerfilMenu}
                perfilMenuRef={perfilMenuRef}
                perfilButtonRef={perfilButtonRef}
              >
                <div className="navbar__user__menu bg-gray-50 shadow-md">
                  <NavLink to="/sing-in" className="navbar__user__menu__link">
                    Iniciar sesión
                  </NavLink>
                  <NavLink to="/sing-up" className="navbar__user__menu__link">
                    Registrarse
                  </NavLink>
                </div>
              </Perfil>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
