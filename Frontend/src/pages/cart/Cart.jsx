import cart from "./cart.module.css";
import classNames from "classnames";
import cartStyle from "./cart.module.css"
import { useContext } from 'react';
import { EmptyCart } from '../../components/emptyCart/EmptyCart';
import { FullCart } from '../../components/fullCart/FullCart';
import { CartContext } from "../../context/CarritoContext";

export function Cart() {

  const { cart } = useContext(CartContext);

  return (
    <div className={classNames(cartStyle.cart__container)}>
      {cart.length ? <FullCart /> : <EmptyCart />}
    </div>
  )
}

