import { useContext } from "react";
import summary from "./summary.module.css";
import { CartContext } from "../../context/CarritoContext";
import classNames from "classnames";
import { ProductContext } from "../../context/ProductContext";

export function Summary() {
  const { cart, formatearPrecio } = useContext(CartContext);
  const { directBuy } = useContext(ProductContext);

  const totalProductos = cart.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );

  const totalPrecio = cart.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  return (
    <div className="">
      <div>
        <h2 className="mb-8">Resumen de compra</h2>
        <div
          className={classNames(
            "mb-5",
            "flex",
            "items-center",
            summary.summary__products
          )}
        >
          <p className="font-semibold mr-2">Cantidad de productos:</p>
          <p>{totalProductos}</p>
        </div>
        <div
          className={classNames("flex", "items-center", summary.summary__price)}
        >
          <p className="font-semibold mr-2">Total:</p>
          <p>{formatearPrecio(totalPrecio)}</p>
        </div>
      </div>
    </div>
  );
}
