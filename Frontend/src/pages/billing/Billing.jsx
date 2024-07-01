import { useState, useContext, useEffect } from "react";
import summary from "../../components/summary/summary.module.css"
import billing from "./billing.module.css"
import classNames from "classnames";
import { PaymentMethods } from "../../components/paymentMethods/PaymentMethods";
import { Summary } from "../../components/summary/Summary";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { ThreeDots } from "react-loader-spinner";
import { CheckoutContext } from "../../context/CheckoutContext";
import { CartContext } from "../../context/CarritoContext";
import { UserContext } from "../../context/UserContext";
import { NavLink } from "react-router-dom";

export function Billing() {
  const { userToken, userData, user } = useContext(UserContext);
  const { isLoading, handleButtonClick, selectedPaymentMethod, setSelectedPaymentMethod } = useContext(CheckoutContext);
  const { cart } = useContext(CartContext);
  const totalPrecio = cart.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
  const [addOrder, setAddOrder] = useState([]); //post
  const [orders, setOrders] = useState([]);

  console.log(cart)


  const handleOrder = async (id, idProducto, cantidad) => {
    try {
      for (const producto of cart) {
        const response = await fetch(`https://edimarket.onrender.com/venta`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            id: user.id,
            idProducto: producto.producto_id,
            cantidad: producto.cantidad,
            // precio: producto.precio,
          })
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        console.log('Compra realizada', data);
        setAddOrder(prev => [...prev, data]);
        return data;
      }

      handleButtonClick();

    } catch (error) {
      console.error('Error al realizar la compra:', error);
    }
  };

  return (
    <div className={classNames('pt-10', 'billing__container')}>
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
          <GeneralBtn
              className={classNames('mt-8', 'summary__button')}
              type="primary"
              onClick={() => {
                console.log('Button clicked');
                handleOrder();
              }}
            >
              realizar compra
            </GeneralBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
