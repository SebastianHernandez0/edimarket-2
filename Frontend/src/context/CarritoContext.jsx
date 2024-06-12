import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartModal, setCartModal] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [productAlreadyInCart, setProductAlreadyInCart] = useState("");

  const openModalCart = () => {
    if (!cartModal) {
      setCartModal(true);
    }
  };

  useEffect(() => {
    if (navigate) {
      setCartModal(false);
    }
  }, [navigate]);

  const addToCart = (product) => {
    const productCartIndex = cart.findIndex((item) => item.id === product.id);
    if (productCartIndex !== -1) {
      return;
    }

    setCart((prevState) => [
      ...prevState,
      {
        ...product,
      },
    ]);
  };

  return (
    <CartContext.Provider
      value={{
        cartModal,
        setCartModal,
        openModalCart,
        addToCart,
        cart,
        setCart,
        productAlreadyInCart,
        setProductAlreadyInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
