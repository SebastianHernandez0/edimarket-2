import { useState } from 'react';
import paymentInfo from "/public/paymentInfo.json";
import { CheckoutContext } from "../../context/CheckoutContext";

export function PaymentMethods() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const paymentInfoJson = paymentInfo;

  const handleCheckboxChange = (metodo_id) => {
    setSelectedPaymentMethod(metodo_id);
  };

  const handleEfectivoChange = () => {
    setSelectedPaymentMethod('efectivo');
  };

  return (
    <>
      <div className='container'>
        {paymentInfoJson.map((paymentMethod) => (
          <div key={paymentMethod.metodo_id} className={paymentMethod.tipo.toLowerCase()}>
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
        <div className='efectivo'>
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

