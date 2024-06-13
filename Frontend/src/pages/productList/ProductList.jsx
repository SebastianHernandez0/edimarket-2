import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { ProductCard } from "../../components/productCard/ProductCard";

export function ProductList() {
  const { categoria } = useParams(); // Obtenemos el parámetro de categoría de la URL
  const { products } = useContext(ProductContext);

  // Filtramos los productos basados en la categoría seleccionada
  const filteredProducts = products.filter(
    (product) => product.categorias.toLowerCase() === categoria.toLowerCase()
  );

  return (
    <div className="productslist__container">
      <h1 className="productslist__title text-2xl font-semibold">
        Productos recomendados
      </h1>
      <div className="products__cards__container">
        {filteredProducts?.map((product) => (
          <ProductCard
            onClick={() => handleProductDetail(product?.id)}
            key={product?.id}
            className="productslist__card shadow-md bg-white"
          >
            <div className="productslist__card__img__container">
              <img
                className="productslist__card__img"
                src={product?.href}
                alt={product?.nombre}
              />
              <div className="productslist__card__desc__container px-4">
                <p className="productlist__card__paragraph text-slate-700 font-semibold text-lg">
                  {product?.nombre}
                </p>
                <p className="productslist__card__paragraph font-semibold text-2xl">
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
