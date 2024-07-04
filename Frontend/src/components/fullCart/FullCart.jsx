import { useContext } from "react";
import { ProductCard } from "../../components/productCard/ProductCard";
import { CartContext } from "../../context/CarritoContext";
import { UserContext } from "../../context/UserContext";
import "../fullCart/fullCart.css";
import cartStyle from "../../pages/cart/cart.module.css";
import { Summary } from "../summary/Summary";
import { GeneralBtn } from "../generalBtn/GeneralBtn";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { CgMathPlus } from "react-icons/cg";
import { CgMathMinus } from "react-icons/cg";

export function FullCart() {
  const { cart, formatearPrecio } = useContext(CartContext);
  const { user, userToken, handleAddedToCart } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDeleteProduct = async (product_id, usuario_id) => {
    try {
      if (userToken) {
        const response = await fetch(
          `http://localhost:3000/carrito/${product_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
              usuario_id,
            }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al eliminar del carrito");
        }
        const data = response.json();
        handleAddedToCart();

        return data;
      } else {
        return;
      }
    } catch (error) {
      console.error("Error al elimninar del carrito:", error);
    }
  };

  const handleNextStep = () => {
    navigate("/shipping");
  };

  return (
    <div className="fullcart__container pt-10">
      <h1 className="ml-5 mb-10">Tus productos</h1>
      <div className="flex flex-col md:flex-row gap-5 md:gap-0">
        <div
          className={classNames(
            "w-full shadow-sm",
            "md:w-2/3",
            "p-4",
            cartStyle.cart_box
          )}
        >
          <div className="cart__cards__container">
            {cart.map((element) => (
              <ProductCard key={element.carro_id}>
                <div
                  className={classNames(
                    "cart__card__body overflow-hidden",
                    cartStyle.product_container
                  )}
                >
                  <div className="flex overflow-hidden gap-3 w-full">
                    <img
                      className="cart__card__img shadow-md"
                      src={element.imagen}
                      alt="producto"
                    />
                    <div className="overflow-hidden w-full">
                      <div className="flex justify-between w-full flex-wrap">
                        <p className="card__card__paragraph text-l text-ellipsis whitespace-nowrap overflow-hidden mb-2">
                          {element.nombre}
                        </p>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="cart__product__add flex items-center rounded bg-gray-100 p-1">
                            <CgMathMinus className="icon text-2xl cursor-pointer hover:bg-slate-200 rounded" />
                            <span className="px-3">{element?.cantidad}</span>
                            <CgMathPlus className="icon text-2xl cursor-pointer hover:bg-slate-200 rounded" />
                          </div>
                          <p className="font-semibold text-lg">
                            {formatearPrecio(element.precio)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-start">
                        <span className="text-xs font-medium mb-2 text-gray-800">
                          Disponible {element?.stock}
                        </span>
                        <button
                          onClick={() =>
                            handleDeleteProduct(element.producto_id, user.id)
                          }
                          className="text-sm font-medium mt-2"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ProductCard>
            ))}
          </div>
        </div>
        <div className="p-4 w-full md:w-1/3 bg-white m-0 md:ml-8 shadow-sm rounded-md">
          <Summary />
          <div>
            <GeneralBtn
              onClick={handleNextStep}
              type="primary"
              className={classNames("mt-8", cartStyle.summary__button)}
            >
              Continuar compra
            </GeneralBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
