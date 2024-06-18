import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductContext = createContext();

const productsURL = "/product.json";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productById, setProductById] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [openCategories, setOpenCategories] = useState(false);
  const [addedToFav, setAddedToFav] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);
  const navigate = useNavigate();

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

  const handleProductDetail = (id) => {
    const product = products.find((product) => product.id === id);
    if (product) {
      // Verificar si el producto ya está presente
      const isProductAlreadyAdded = productById.id === id;

      // Si el producto no está presente, lo añadimos
      if (!isProductAlreadyAdded) {
        setProductById(product);
      }
      navigate(`/product/${id}`);
    } else {
      console.log("Producto no encontrado");
    }
  };

  const addToFav = (product) => {
    const productFavIndex = addedToFav.findIndex(
      (item) => item.id === product.id
    );
    if (productFavIndex !== -1) {
      return;
    }

    setAddedToFav((prevState) => [
      ...prevState,
      {
        ...product,
        like: true,
      },
    ]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        productById,
        setProductById,
        addedProducts,
        setAddedProducts,
        openCategories,
        setOpenCategories,
        handleProductDetail,
        addToFav,
        addedToFav,
        setAddedToFav,
        productQuantity,
        setProductQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
