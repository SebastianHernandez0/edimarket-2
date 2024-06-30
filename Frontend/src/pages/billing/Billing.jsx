import { useState, useContext } from "react";
import summary from "../../components/summary/summary.module.css"
import billing from "./billing.module.css"
import classNames from "classnames";
import { PaymentMethods } from "../../components/paymentMethods/PaymentMethods";
import { Summary } from "../../components/summary/Summary";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { ThreeDots } from "react-loader-spinner";
import { CheckoutContext } from "../../context/CheckoutContext";
import { CartContext } from "../../context/CarritoContext";
import { NavLink } from "react-router-dom";

export function Billing() {

// aquí funciones del billing: guardar info de la compra (post)

  const { isLoading, handleButtonClick, selectedPaymentMethod, setSelectedPaymentMethod } = useContext(CheckoutContext);
  const { cart, setCart } = useContext(CartContext);

  return (
    <div className={classNames('pt-10', billing.billing__container)}>
      <h1 className="mb-10 ml-5">¿Cómo quieres pagar?</h1>
      <div className="flex mx-8 md:mx-8 lg:mx-28 flex-col md:flex-row">
        <div className="delivery w-full md:w-2/3">
          <PaymentMethods
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />
        </div>
        <div className="p-4 summary_container w-full md:w-1/3 bg-white m-0 md:ml-8">
          <Summary />
          <div className="">
            <GeneralBtn className={classNames('mt-8', summary.summary__button)} type="primary" onClick={handleButtonClick} disabled={!selectedPaymentMethod}>
              {isLoading ? (
                <ThreeDots
                  visible={true}
                  height="25"
                  width="100%"
                  color="#FFFFFF"
                  radius="2"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <NavLink to="/compra-exitosa">Realizar pago</NavLink>
              )} 
            </GeneralBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
