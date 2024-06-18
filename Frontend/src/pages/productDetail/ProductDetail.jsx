import "../productDetail/productDetail.css";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { ProductCard } from "../../components/productCard/ProductCard";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { IoHeartSharp } from "react-icons/io5";
import { CartContext } from "../../context/CarritoContext";
import { CartAlert } from "../../components/cartAlert/CartAlert";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { OverlayScreen } from "../../components/overlayScreen/OverlayScreen";

export function ProductDetail() {
  const { productById, addToFav, addedToFav } = useContext(ProductContext);
  const {
    openModalCart,
    addToCart,
    cart,
    productAlert,
    setProductAlert,
    cartModal,
  } = useContext(CartContext);
  const timeoutRef = useRef(null);

  const handleAddToCart = () => {
    if (!cart.some((product) => product.id === productById.id)) {
      addToCart(productById);
      openModalCart();
    } else {
      const productAdded = cart.find(
        (product) => product.id === productById.id
      );
      if (productAdded) {
        setProductAlert((prevState) => ({
          ...prevState,
          error: "Ya añadiste este producto al carrito.",
          success: "",
        }));

        // Cancelamos el temporizador anterior si existe
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Establecemos un nuevo temporizador
        timeoutRef.current = setTimeout(() => {
          setProductAlert((prevState) => ({
            ...prevState,
            error: "",
          }));
          timeoutRef.current = null; // Limpiamos la referencia al temporizador
        }, 2400);
      }
    }
  };

  const handleAddToFav = () => {
    if (!addedToFav.some((product) => product.id === productById.id)) {
      addToFav(productById);
      setProductAlert((prevState) => ({
        ...prevState,
        success: "¡Producto añadido a favoritos!.",
        error: "",
      }));

      timeoutRef.current = setTimeout(() => {
        setProductAlert((prevState) => ({
          ...prevState,
          success: "",
        }));
        timeoutRef.current = null; // Limpiamos la referencia al temporizador
      }, 2400);
    } else {
      const favAdded = addedToFav.find(
        (product) => product.id === productById.id
      );
      if (favAdded) {
        setProductAlert((prevState) => ({
          ...prevState,
          error: "Ya añadiste este producro a favoritos.",
          success: "",
        }));

        // Cancelamos el temporizador anterior si existe
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Establecemos un nuevo temporizador
        timeoutRef.current = setTimeout(() => {
          setProductAlert((prevState) => ({
            ...prevState,
            error: "",
          }));
          timeoutRef.current = null; // Limpiamos la referencia al temporizador
        }, 2400);
      }
    }
  };

  return (
    <section className="productdetail__container">
      <div className="card__container">
        {cartModal ? <OverlayScreen /> : ""}
        <ProductCard className="card__body shadow-md rounded-md">
          <img className="card__img" src={productById?.href} alt="" />
          <div className="card__info border-2 rounded-md">
            <div className="card__info__details">
              <p className="card__paragraph card__paragraph__name">
                {productById?.nombre}
              </p>
              <div className="card__info__price__details">
                <p className="card__paragraph card__paragraph__price">
                  {productById?.precio.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </p>
                <IoHeartSharp
                  onClick={handleAddToFav}
                  className={`card__info__like__icon ${
                    addedToFav.some((product) => product.id === productById.id)
                      ? "text-red-600 transition duration-300"
                      : "text-gray-400"
                  }`}
                />
              </div>

              <p className="card__paragraph card__paragraph__stock">
                Stock disponible{" "}
                <span className="font-semibold">{productById?.stock}</span>
              </p>
            </div>
            <div className="card__info__btn__container">
              <GeneralBtn
                className="card__info__btn card__info__btn__buy"
                type="secondary"
              >
                <NavLink to="/shipping">Comprar ahora</NavLink>
              </GeneralBtn>
              <GeneralBtn
                onClick={handleAddToCart}
                className="card__info__btn card__info__btn__cart"
                type="primary"
              >
                Agregar al carrito
              </GeneralBtn>
            </div>
            <hr className="mt-8" />
          </div>
          <div className="card__info__desc__container mt-8 p-4">
            <h1 className="card__info__desc__title text-2xl">Descripción</h1>
            <div className="card__info__desc mt-10">
              {productById?.descripcion}
            </div>
          </div>
        </ProductCard>
        {productAlert.error ? (
          <CartAlert>
            <div>
              <p className="card__cart__alert shadow-md rounded-md bg-slate-700">
                {productAlert.error}
              </p>
            </div>
          </CartAlert>
        ) : (
          ""
        )}
        {productAlert.success ? (
          <CartAlert>
            <div>
              <p className="card__cart__alert shadow-md rounded-md bg-green-600">
                {productAlert.success}
              </p>
            </div>
          </CartAlert>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
