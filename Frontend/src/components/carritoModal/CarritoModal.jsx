import "../carritoModal/carritoModal.css";
import { useContext } from "react";
import { CartContext } from "../../context/CarritoContext";
import { IoCloseOutline } from "react-icons/io5";
import { ProductCard } from "../productCard/ProductCard";
import { GeneralBtn } from "../generalBtn/GeneralBtn";
import { useNavigate } from "react-router-dom";

export function CarritoModal() {
  const { cartModal, setCartModal, cart } = useContext(CartContext);

  console.log(cart)

  const closeCartModal = () => {
    if (cartModal) {
      setCartModal(false);
    }
  };

  const navigate = useNavigate();

  const handleNavigateToCart = () => {
    navigate("/carro");
  };

  return (
    <section className="cartmodal__container rounded-md">
      {cartModal ? (
        <div className="cartmodal__body rounded-md shadow">
          <IoCloseOutline
            onClick={closeCartModal}
            className="cartmodal__icon"
          />
          <h1 className="cartmodal__title text-center font-medium mt-3">
            Agregaste al carrito{" "}
            <span className="font-normal text-sm">
              ({cart.length} Productos)
            </span>
          </h1>
          <div className="cart__cards__container">
            {cart.map((element) => (
              <ProductCard key={element.id}>
                <div className="cart__card__body">
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
          <div className="card__button__container">
            <GeneralBtn onClick={handleNavigateToCart}>
              <div className="card__button">Ir al carrito</div>
            </GeneralBtn>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
