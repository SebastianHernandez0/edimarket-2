import { useContext } from "react";
import { ProductCard } from "../../components/productCard/ProductCard";
import { CartContext } from "../../context/CarritoContext";
import "../fullCart/fullCart.css";

export function FullCart() {
  const { cartModal, setCartModal, cart } = useContext(CartContext);

  return (
    <div className="fullcart__container">
      <h1>Tus productos</h1>
      <div className="productos_carro">
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
      </div>
      <div className="resumen_compra">
        <p>Productos: </p>
        <p>Total: </p>
        <button>Continuar compra</button>
      </div>
    </div>
  );
}
