import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productById, setProductById] = useState(null);
  const [addedProducts, setAddedProducts] = useState([]);
  const [openCategories, setOpenCategories] = useState(false);
  const [addedToFav, setAddedToFav] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState("");
  const [productAlert, setProductAlert] = useState({
    succes: "",
    error: "",
    errorFav: "",
  });

  useEffect(() => {
    setProductAlert({
      succes: "",
      error: "",
      errorFav: "",
      errorCart:""
    });
  }, [navigate]);

  const getUserById = async (vendedor_id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/usuarios/${vendedor_id}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener usuario");
      }
      const data = await response.json();
      setSeller(data);
      return data;
    } catch (error) {
      console.error("Error al obtener usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productById && productById.vendedor_id) {
      getUserById(productById.vendedor_id);
    }
  }, [productById]);

  const handleGetProducts = async () => {
    setLoading(true);
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

  const handleGetProduct = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/productos/${id}`);
      if (!response.ok) {
        throw new Error("Producto no encontrado");
      }
      const data = await response.json();
      setProduct(data);
      setProductById(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      navigate("/not-found");
    } finally {
      setLoading(false);
    }
  };

  const handleProductDetail = (id) => {
    navigate(`/product/${id}`);
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
        handleGetProduct,
        seller,
        handleGetProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
