import { useContext } from "react";
import "../carritoModal/carritoModal.css";
import { CartContext } from "../../context/CarritoContext";
import { IoCloseOutline } from "react-icons/io5";

export function CarritoModal() {
  const { cartModal, setCartModal } = useContext(CartContext);

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
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
