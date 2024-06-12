import { useContext } from "react";
import "../carritoModal/carritoModal.css";
import { CartContext } from "../../context/CarritoContext";

export function CarritoModal() {
  const { cartModal } = useContext(CartContext);

  return (
    <section className="carritomodal__container">
      {cartModal ? <h1>Hola soy el carrito modal jeje komotas</h1> : ""}
    </section>
  );
}
