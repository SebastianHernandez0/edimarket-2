import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import user from "/public/user.json";
import paymentInfo from "/public/paymentInfo.json";

export const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {

  // SHIPPING CONTEXT
  const [selectedAddress, setSelectedAddress] = useState('pickup');
  const userData = user;

  const handleAddressChange = (id) => {
    setSelectedAddress(id);
  };

  const handlePickupChange = () => {
    setSelectedAddress('pickup');
  };

  // BILLING CONTEXT
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const paymentInfoJson = paymentInfo;

  const handleCheckboxChange = (id) => {
    setSelectedPaymentMethod(id);
  };

  const handleEfectivoChange = () => {
    setSelectedPaymentMethod('efectivo');
  };

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (!selectedPaymentMethod) {
      alert("Por favor, selecciona un método de pago antes de continuar.");
      return;
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/compra-exitosa");
      }, 1500);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

    return (
      <CheckoutContext.Provider
        value={{
          selectedAddress,
          setSelectedAddress,
          userData,
          handleAddressChange,
          handlePickupChange,
          selectedPaymentMethod,
          setSelectedPaymentMethod,
          paymentInfoJson,
          handleCheckboxChange,
          handleEfectivoChange,
          handleButtonClick,
          isLoading,
          setIsLoading,
          navigate,
          capitalizeFirstLetter,
        }}
      >
        {children}
      </CheckoutContext.Provider>
    );
  }