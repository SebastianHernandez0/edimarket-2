import emptyCart from "/imgs/aplication/empty-cart.png";
import { GeneralBtn } from "../generalBtn/GeneralBtn";
import { NavLink } from "react-router-dom";
import "../emptyCart/emptyCart.css";

export function EmptyCart() {
  return (
    <div className="emptyCart__container flex justify-center items-center flex-col mb-50 bg-gray-50 shadow-md rounded">
      <div className="emptyCart__body flex flex-col items-center h-[500px] justify-center">
        <div className="flex flex-col gap-3 items-center">
          <img src={emptyCart} alt="empty cart" className="w-[200px] sm:w-[250px]" />
          <h1 className="text-center">¡Tu carro está vacío!</h1>
          <p className="pb-[50px]">
            Añade algunos productos para empezar a comprar
          </p>
        </div>

        <GeneralBtn type="primary">
          <NavLink to="/">Volver a productos</NavLink>
        </GeneralBtn>
      </div>
    </div>
  );
}
