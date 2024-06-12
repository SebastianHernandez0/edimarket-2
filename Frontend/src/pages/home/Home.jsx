import "../home/home.css";
import products from "../../../public/product.json";
import { ProductCard } from "../../components/productCard/ProductCard";

console.log(products);
export function Home() {
  return (
    <section className="home__container">
      <div className="home__cards__container">
        {products.map((product) => (
          <ProductCard key={product.id} className="home__card">
            <img
              className="home__card__img"
              src={product.href}
              alt={product.nombre}
            />
            <p className="home__card__paragraph">{product.nombre}</p>
            <p className="home__card__paragraph">
              {product.precio.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </p>
          </ProductCard>
        ))}
      </div>
    </section>
  );
}
