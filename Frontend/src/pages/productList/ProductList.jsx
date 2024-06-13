import "../../components/products/products.css"
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { ProductCard } from "../../components/productCard/ProductCard";

export function ProductList() {
  const { categoria } = useParams();
  const { products, productById, setProductById } = useContext(ProductContext);
  const navigate = useNavigate();

  const filteredProducts = products.filter(
    (product) => product.categorias.toLowerCase() === categoria.toLowerCase()
  );

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

  return (
    <div className="products__container">
      <h1 className="products__title text-2xl font-semibold">
        Estás en la siguiente categoría {categoria}
      </h1>
      <div className="products__cards__container">
        {filteredProducts?.map((product) => (
          <ProductCard
            onClick={() => handleProductDetail(product?.id)}
            key={product?.id}
            className="products__card shadow-md bg-white"
          >
            <div className="products__card__img__container">
              <img
                className="products__card__img"
                src={product?.href}
                alt={product?.nombre}
              />
              <div className="products__card__desc__container px-4">
                <p className="products__card__paragraph text-slate-700 font-semibold text-lg">
                  {product?.nombre}
                </p>
                <p className="products__card__paragraph font-semibold text-2xl">
                  {product?.precio.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </p>
              </div>
            </div>
          </ProductCard>
        ))}
      </div>
    </div>
  );
}
