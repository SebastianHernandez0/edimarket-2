import { useState, useContext } from 'react';
import { CheckoutContext } from "../../context/CheckoutContext";
import shipping from "/src/pages/shipping/shipping.module.css";
import classNames from 'classnames';

export function PaymentMethods() {
  const { selectedPaymentMethod, paymentInfoJson, handleCheckboxChange, handleEfectivoChange } = useContext(CheckoutContext);

  return (
    <>
      <div className={classNames('p-4', shipping.billing_box)}>
        {paymentInfoJson.map((paymentMethod) => (
          <div key={paymentMethod.metodo_id} className={classNames("credit_card", shipping.delivery_type_container, shipping.delivery, paymentMethod.tipo.toLowerCase())}>
            <input
              type="checkbox"
              id={`checkbox-${paymentMethod.metodo_id}`}
              value={paymentMethod.metodo_id}
              checked={selectedPaymentMethod === paymentMethod.metodo_id}
              onChange={() => handleCheckboxChange(paymentMethod.metodo_id)}
            />
            <label htmlFor={`checkbox-${paymentMethod.metodo_id}`}>{paymentMethod.tipo}</label>
            <p>Número de tarjeta: {paymentMethod.numero_tarjeta}</p>
            <p>Fecha de expiración: {paymentMethod.fecha_expiracion}</p>
          </div>
        ))}
        <div className={classNames("efectivo", shipping.delivery_type_container, shipping.delivery)}>
          <input
            type="checkbox"
            id="checkbox-efectivo"
            value="efectivo"
            checked={selectedPaymentMethod === 'efectivo'}
            onChange={handleEfectivoChange}
          />
          <label htmlFor="checkbox-efectivo">Efectivo</label>
          <p>(al llegar mi compra)</p>
        </div>
      </div>
    </>
  );
}

