import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productById, setProductById] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [openCategories, setOpenCategories] = useState(false);
  const [addedToFav, setAddedToFav] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [productAlert, setProductAlert] = useState({
    succes: "",
    error: "",
    errorFav: "",
  });

  const handleGetProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/productos");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener productos");
      }

      const data = await response.json();

      // Formatear el precio a peso chileno
      const formattedProducts = data.results.map((product) => ({
        ...product,
        precio: new Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
        }).format(product.precio),
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProducts();
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

  const handleProductQuantity = (e) => {
    setProductQuantity(Number(e.target.value));
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
        addedToFav,
        setAddedToFav,
        productQuantity,
        setProductQuantity,
        handleProductQuantity,
        loading,
        setLoading,
        product,
        setProduct,
        productAlert,
        setProductAlert,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
