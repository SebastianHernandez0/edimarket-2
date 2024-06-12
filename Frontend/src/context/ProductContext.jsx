import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

const productsURL = "/product.json";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productById, setProductById] = useState("");

  const getProductLists = async () => {
    try {
      const response = await fetch(productsURL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log("error al obtener los datos");
    }
  };

  useEffect(() => {
    getProductLists();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        productById,
        setProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
