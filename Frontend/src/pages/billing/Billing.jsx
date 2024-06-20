import { useState, useContext } from "react";
import billing from "./billing.module.css";
import classNames from "classnames";
import { PaymentMethods } from "../../components/paymentMethods/PaymentMethods";
import { Summary } from "../../components/summary/Summary";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { ThreeDots } from "react-loader-spinner";
import { CheckoutContext } from "../../context/CheckoutContext";

export function Billing() {
  const { isLoading, handleButtonClick, selectedPaymentMethod, setSelectedPaymentMethod } = useContext(CheckoutContext);

  return (
    <>
      <h1>¿Cómo quieres pagar?</h1>
      <div className="flex mx-8 md:mx-8 lg:mx-28 flex-col md:flex-row">
        <div className="delivery w-full md:w-2/3">
          <PaymentMethods
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />
        </div>
        <div className="summary_container w-full md:w-1/3 bg-white m-0 md:ml-8">
          <Summary />
          <div className="">
            <GeneralBtn type="primary" onClick={handleButtonClick} disabled={!selectedPaymentMethod}>
              {isLoading ? (
                <ThreeDots
                  visible={true}
                  height="25"
                  width="100"
                  color="#FFFFFF"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Realizar pago"
              )}
            </GeneralBtn>
          </div>
        </div>
      </div>
    </>
  );
}
