import { useContext } from "react";
import { ProductCard } from "../../components/productCard/ProductCard";
import { CartContext } from "../../context/CarritoContext";
import "../fullCart/fullCart.css";
import cartStyle from "../../pages/cart/cart.module.css"
import { Summary } from "../summary/Summary";
import { GeneralBtn } from "../generalBtn/GeneralBtn";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

export function FullCart() {
  const { cartModal, setCartModal, cart } = useContext(CartContext);

  return (
    <div className="fullcart__container pt-10">
      <h1 className="ml-5 mb-10">Tus productos</h1>
      <div className="flex mx-8 md:mx-8 lg:mx-28 flex-col md:flex-row">
        <div className={classNames('w-full', 'md:w-2/3', 'p-4', cartStyle.cart_box)}>
          <div className="cart__cards__container">
            {cart.map((element) => (
              <ProductCard key={element.id}>
                <div className={classNames('cart__card__body', cartStyle.product_container)}>
                  <img
                    className="cart__card__img shadow-md"
                    src={element.href}
                    alt="producto"
                  />
                  <div>
                  <p className="card__card__paragraph text-md font-light">
                    {element.nombre}
                  </p>
                  <p>$ {element.precio}</p>
                  </div>
                </div>
              </ProductCard>
            ))}
          </div>
        </div>
        <div className="p-4 w-full md:w-1/3 bg-white m-0 md:ml-8">
          <Summary />
          <div>
            <GeneralBtn type="primary" className={classNames('mt-8', cartStyle.summary__button)}>
              <NavLink to="/billing">Continuar compra</NavLink>
            </GeneralBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
