import { Adresses } from "../../components/adresses/Adresses";
import { PaymentMethods } from "../../components/paymentMethods/PaymentMethods";
import shipping from "./shipping.module.css";
import summary from "../../components/summary/summary.module.css"
import classNames from "classnames";
import { CheckoutContext } from "../../context/CheckoutContext"
import { Summary } from "../../components/summary/Summary";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { NavLink } from "react-router-dom";

export function Shipping() {
  return (
    <div className="">
      <h1 className='mb-[50px]'>Elige dónde quieres recibir tu compra:</h1>
      <div className="shipping__container flex mx-8 md:mx-8 lg:mx-28 flex-col md:flex-row">
        <div className="delivery w-full md:w-2/3">
          <Adresses />
        </div>
        <div className="w-full md:w-1/3 bg-white m-0 md:ml-8">
          <Summary />
          <div>
            <GeneralBtn type="primary">
              <NavLink to="/billing">Continuar compra</NavLink>
            </GeneralBtn>
          </div>
        </div>
      </div>
    </div>
  )
}
