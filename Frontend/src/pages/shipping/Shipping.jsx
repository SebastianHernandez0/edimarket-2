import { Adresses } from "../../components/adresses/Adresses";
import { PaymentMethods } from "../../components/paymentMethods/PaymentMethods";
import shipping from "./shipping.module.css";
import { CheckoutContext } from "../../context/CheckoutContext"
import { Summary } from "../../components/summary/Summary";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { NavLink } from "react-router-dom";

export function Shipping() {
  return (
    <div className="">
      <h1 className='mb-[50px]'>Elige dónde quieres recibir tu compra:</h1>
      <div className="shipping_container columns-2">
        <div className='delivery'>
          <Adresses />
          {/* <button className="button-primary" onClick={handleContinueToPayment()}>Continuar con el pago</button> */}
          {/* error si no selecciona */}
        </div>
        <div className="summary_container">
          <Summary />
          <GeneralBtn type="primary">
            <NavLink to="/billing">Continuar compra</NavLink>
          </GeneralBtn>
        </div>
      </div>
    </div>
  )
}
