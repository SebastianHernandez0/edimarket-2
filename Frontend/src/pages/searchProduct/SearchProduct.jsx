import { useContext } from "react";
import "../searchProduct/searchProduct.css";
import { ProductContext } from "../../context/ProductContext";
import { ProductCard } from "../../components/productCard/ProductCard";

export function SearchProduct() {
  const { findedProduct, handleProductDetail } = useContext(ProductContext);

  return (
    <section className="searchproduct__container">
      <h1>Resultados de la búsqueda</h1>
      <div className="products__cards__container">
        {findedProduct.length > 0 ? (
          findedProduct.map((product) => (
            <ProductCard
              onClick={() => handleProductDetail(product?.id)}
              key={product?.id}
              className="products__card shadow-md bg-white"
            >
              <div className="products__card__img__container">
                <img
                  className="products__card__img"
                  src={product?.imagen}
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
          ))
        ) : (
          <div>
            <h1>No hay resultados para tu búsqueda</h1>
          </div>
        )}
      </div>
    </section>
  );
}
