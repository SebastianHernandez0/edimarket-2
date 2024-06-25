import cart from "./cart.module.css";
import classNames from "classnames";
import { useContext } from 'react';
import { EmptyCart } from '../../components/emptyCart/EmptyCart';
import { FullCart } from '../../components/fullCart/FullCart';
import { CartContext } from "../../context/CarritoContext";

export function Cart() {

  const { cartModal, setCartModal, cart } = useContext(CartContext);

  console.log(cart)

  return (
    <div className='cart__container'>
      {cart.length ? <FullCart /> : <EmptyCart />}
    </div>
  )
}

