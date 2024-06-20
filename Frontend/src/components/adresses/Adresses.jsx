import { useContext } from 'react';
import classNames from 'classnames';
import shipping from "/src/pages/shipping/shipping.module.css";
import { CheckoutContext } from "../../context/CheckoutContext";

export function Adresses() {
  const { selectedAddress, setSelectedAddress, userData, handleAddressChange, handlePickupChange } = useContext(CheckoutContext);

  return (
    <div className="">
      <div className={classNames('p-4', shipping.shipping_box)}>
        <div className={classNames(shipping.delivery_type_container, shipping.delivery)}>
          <input
            type="checkbox"
            id="pickup"
            checked={selectedAddress === 'pickup'}
            onChange={handlePickupChange}
          />
          <label htmlFor="pickup">Retira en tu punto más cercano</label>
        </div>
        {userData.map((user) => (
          <div key={user.id} className={classNames(shipping.delivery_type_container, shipping.delivery)}>
            <input
              type="checkbox"
              id={`address-${user.id}`}
              checked={selectedAddress === user.id}
              onChange={() => handleAddressChange(user.id)}
            />
            <label htmlFor={`address-${user.id}`}>Dirección</label>
            <p>{user.domicilio.direccion}</p>
            <p>{user.domicilio.ciudad}</p>
            <p>{user.domicilio.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
