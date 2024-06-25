import React from "react";
import emptyCart from "/public/imgs/aplication/emptycart.png";
import { GeneralBtn } from "../generalBtn/GeneralBtn";
import { NavLink } from "react-router-dom";
import "../emptyCart/emptyCart.css";

export function EmptyCart() {
  return (
    <div className="emptyCart__container flex justify-center items-center flex-col mb-50">
      <img src={emptyCart} alt="empty cart" className="my-[20px] h-96" />
      <h1 className="text-center">Tu carro está vacío</h1>
      <p className="pb-[50px]">Suma productos y consigue envío gratis :D</p>
      <GeneralBtn type="primary">
        <NavLink to="/">Volver a productos</NavLink>
      </GeneralBtn>
    </div>
  );
}
