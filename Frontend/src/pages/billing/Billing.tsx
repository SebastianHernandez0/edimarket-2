import React from "react";
import { PaymentMethods } from "../../components/paymentMethods/PaymentMethods";
import { Summary } from "../../components/summary/Summary";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { ThreeDots } from "react-loader-spinner";

export function Billing() {
  return (
    <>
      <h1>¿Cómo quieres pagar?</h1>
      <div className="billing_container columns-2">
        <div className="paymentMethods_container">
          <PaymentMethods />
        </div>
        <div className="summary_container">
          <Summary />
          <GeneralBtn type="primary">
            Realizar pago
            {/* render(
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            ) */}
          </GeneralBtn>
        </div>
      </div>
      {/* loader y alert pago exitoso */}
    </>
  );
}
