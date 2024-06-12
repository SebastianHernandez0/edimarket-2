import { useContext } from "react";
import "../carritoModal/carritoModal.css";
import { CartContext } from "../../context/CarritoContext";
import { IoCloseOutline } from "react-icons/io5";
import { ProductCard } from "../productCard/ProductCard";

export function CarritoModal() {
  const { cartModal, setCartModal, cart } = useContext(CartContext);

  const closeCartModal = () => {
    if (cartModal) {
      setCartModal(false);
    }
  };

  return (
    <section className="cartmodal__container">
      {cartModal ? (
        <div className="cartmodal__body rounded-md shadow">
          <IoCloseOutline
            onClick={closeCartModal}
            className="cartmodal__icon"
          />
          <h1 className="cartmodal__title text-center font-medium mt-3">
            Agregaste al carrito
          </h1>
          <div className="cart__cards__container">
            {cart.map((element) => (
              <ProductCard>
                <div key={element.id} className="cart__card__body">
                  <img
                    className="cart__card__img shadow-md"
                    src={element.href}
                    alt=""
                  />
                  <p className="card__card__paragraph text-md font-light">
                    {element.nombre}
                  </p>
                </div>
              </ProductCard>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
