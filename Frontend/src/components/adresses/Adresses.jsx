import { useContext } from 'react';
import classNames from 'classnames';
import shipping from "/src/pages/shipping/shipping.module.css";
import { CheckoutContext } from "../../context/CheckoutContext";

export function Adresses() {
  const { selectedAddress, setSelectedAddress, userData, handleAddressChange, handlePickupChange } = useContext(CheckoutContext);

  return (
    <div className="">

      <div className={classNames('p-4', shipping.shipping_box, shipping.delivery_type_container_pickup, shipping.delivery)}>
        <h2 className='mb-[15px]'>Retira tu compra</h2>
        <div className='flex items-center'>
          <input
            type="checkbox"
            id="pickup"
            checked={selectedAddress === 'pickup'}
            onChange={handlePickupChange}
            className='w-4 h-4 mr-3 text-blue-600 bg-gray-100 border-gray-300 rounded'
          />
          <label htmlFor="pickup">Retira en tu punto más cercano</label>
        </div>
      </div>
      <div className={classNames('mt-10', 'p-4', shipping.shipping_box, shipping.delivery_type_container, shipping.delivery)}>
        <h2>Despacho a domicilio</h2>
        {userData.map((user) => (
          <div key={user.id} className={classNames(shipping.delivery_type_container, shipping.delivery)}>
            <div className='flex items-center'>
              <input
                type="checkbox"
                id={`address-${user.id}`}
                checked={selectedAddress === user.id}
                onChange={() => handleAddressChange(user.id)}
                className='w-4 h-4 mr-3 text-blue-600 bg-gray-100 border-gray-300 rounded'
              />
              <label htmlFor={`address-${user.id}`}>
                <p>{user.domicilio.direccion}, {user.domicilio.ciudad}, {user.domicilio.region}</p>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
