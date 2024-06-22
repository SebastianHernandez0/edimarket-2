import { useContext, useEffect } from "react";
import { ProductCard } from "../../components/productCard/ProductCard.jsx";
import { ProductContext } from "../../context/ProductContext.jsx";
import "../products/products.css";

export function Products() {
  const { products, setProducts, handleProductDetail, loading, setLoading } =
    useContext(ProductContext);

  const handleGetProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/productos");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener domicilio");
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

  return (
    <section>
      {loading ? (
        <p className="text-center font-semibold text-lg">Cargando...</p>
      ) : (
        <div className="products__container">
          <div className="product__title__container">
            <h1 className="products__title text-2xl font-semibold mt-7">
              Productos recomendados
            </h1>
          </div>
          <div className="products__cards__container">
            {products?.map((product) => (
              <ProductCard
                onClick={() => handleProductDetail(product?.id)}
                key={product.id}
                className="products__card shadow-md bg-white"
              >
                <div className="products__card__img__container">
                  <img
                    className="products__card__img"
                    src={product?.imagen}
                    alt={product?.nombre}
                  />
                  <div className="products__card__desc__container px-4">
                    <p className="products__card__paragraph pt-8 text-left">
                      {product?.nombre}
                    </p>
                    <h6 className="products__card__paragraph pb-8 text-left">
                      {product?.precio.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })}
                    </h6>
                  </div>
                </div>
              </ProductCard>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
