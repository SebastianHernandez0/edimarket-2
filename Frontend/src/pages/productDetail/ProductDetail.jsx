import "../productDetail/productDetail.css";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { ProductCard } from "../../components/productCard/ProductCard";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { IoHeartSharp } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { CartContext } from "../../context/CarritoContext";
import { CartAlert } from "../../components/cartAlert/CartAlert";
import { useRef } from "react";

export function ProductDetail() {
  const { productById, addToFav, addedToFav } = useContext(ProductContext);
  const {
    openModalCart,
    addToCart,
    cart,
    productAlreadyInCart,
    setProductAlreadyInCart,
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
        setProductAlreadyInCart("Ya añadiste este producto.");

        // Cancelamos el temporizador anterior si existe
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Establecemos un nuevo temporizador
        timeoutRef.current = setTimeout(() => {
          setProductAlreadyInCart("");
          timeoutRef.current = null; // Limpiamos la referencia al temporizador
        }, 2400);
      }
    }
  };

  const handleAddToFav = () => {
    if (!addedToFav.some((product) => product.id === productById.id)) {
      addToFav(productById);
    } else {
      const favAdded = addedToFav.find(
        (product) => product.id === productById.id
      );
      if (favAdded) {
        setProductAlreadyInCart("Ya agregaste el producto a favoritos.");

        // Cancelamos el temporizador anterior si existe
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Establecemos un nuevo temporizador
        timeoutRef.current = setTimeout(() => {
          setProductAlreadyInCart("");
          timeoutRef.current = null; // Limpiamos la referencia al temporizador
        }, 2400);
      }
    }
  };

  return (
    <section className="productdetail__container">
      <div className="card__container">
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
              <GeneralBtn className="card__info__btn card__info__btn__buy">
                Comprar ahora
              </GeneralBtn>
              <GeneralBtn
                onClick={handleAddToCart}
                className="card__info__btn card__info__btn__cart"
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
        {productAlreadyInCart ? (
          <CartAlert>
            <div>
              <p className="card__cart__alert shadow-md rounded-md">
                {productAlreadyInCart}
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
