import { useState, useContext } from 'react';
import { CheckoutContext } from "../../context/CheckoutContext";
import shipping from "/src/pages/shipping/shipping.module.css";
import classNames from 'classnames';

export function PaymentMethods() {
  const { selectedPaymentMethod, paymentInfoJson, handleCheckboxChange, handleEfectivoChange } = useContext(CheckoutContext);

  return (
    <>
      <div className={classNames('p-4', shipping.billing_box)}>
        <h2>Elige tu medio de pago</h2>
        {paymentInfoJson.map((paymentMethod) => (
          <div key={paymentMethod.metodo_id} className={classNames("credit_card", shipping.delivery_type_container, shipping.delivery, paymentMethod.tipo.toLowerCase())}>
            <div className='flex items-center'>
              <input
                type="checkbox"
                id={`checkbox-${paymentMethod.metodo_id}`}
                value={paymentMethod.metodo_id}
                checked={selectedPaymentMethod === paymentMethod.metodo_id}
                onChange={() => handleCheckboxChange(paymentMethod.metodo_id)}
                className='w-4 h-4 mr-3 text-blue-600 bg-gray-100 border-gray-300 rounded'
              />
              <label htmlFor={`checkbox-${paymentMethod.metodo_id}`} className='font-semibold'>{paymentMethod.tipo}</label>
            </div>
            <p>Número de tarjeta: {paymentMethod.numero_tarjeta}</p>
            {/* mostrar los últimos 4 dígitos, los demás como * */}
            <p>Fecha de expiración: {paymentMethod.fecha_expiracion}</p>
          </div>
        ))}
        <div className={classNames("efectivo", shipping.delivery_type_container, shipping.delivery)}>
          <div className='flex items-center'>

            <input
              type="checkbox"
              id="checkbox-efectivo"
              value="efectivo"
              checked={selectedPaymentMethod === 'efectivo'}
              onChange={handleEfectivoChange}
              className='w-4 h-4 mr-3 text-blue-600 bg-gray-100 border-gray-300 rounded'
              />
            <label htmlFor="checkbox-efectivo" className='font-semibold'>Efectivo</label>
          </div>
          <p>Pagas al recibir la compra</p>
        </div>
      </div>
    </>
  );
}

