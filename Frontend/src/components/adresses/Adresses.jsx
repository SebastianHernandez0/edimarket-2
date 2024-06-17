import { useState } from 'react';
import user from "/public/user.json";
import shipping from "/src/pages/shipping/shipping.module.css";
import classNames from 'classnames';
import { CheckoutContext } from "../../context/CheckoutContext";

export function Adresses() {
  const [selectedAddress, setSelectedAddress] = useState('pickup');
  const userData = user;

  const handleAddressChange = (id) => {
    setSelectedAddress(id);
  };

  const handlePickupChange = () => {
    setSelectedAddress('pickup');
  };

  return (
    <div className="mb-[50px]">
      <div className={classNames('container', shipping.shipping_box)}>
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
