import { useContext } from "react";
import { ProductCard } from "../../components/productCard/ProductCard.jsx";
import { ProductContext } from "../../context/ProductContext.jsx";
import "../products/products.css";

export function Products() {
  const { products, handleProductDetail } = useContext(ProductContext);

  return (
    <div className="products__container">
      <h1 className="products__title text-2xl font-semibold">
        Productos recomendados
      </h1>
      <div className="products__cards__container">
        {products?.map((product) => (
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
