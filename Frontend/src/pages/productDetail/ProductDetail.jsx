import "../productDetail/productDetail.css";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { ProductCard } from "../../components/productCard/ProductCard";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";

export function ProductDetail() {
  const { productById } = useContext(ProductContext);

  return (
    <section className="productdetail__container">
      <div className="card__container">
        <ProductCard className="card__body shadow-md rounded-md">
          <img className="card__img" src={productById?.href} alt="" />
          <div className="card__info border-2 rounded-md">
            <div className="card__info__details">
              <p className="card__paragraph card__paragraph__name">
                {productById?.nombre}
              </p>
              <p className="card__paragraph card__paragraph__price">
                {productById?.precio.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </p>
              <p className="card__paragraph card__paragraph__stock">
                Stock disponible{" "}
                <span className="font-semibold">{productById?.stock}</span>
              </p>
            </div>
            <div className="card__info__btn__container">
              <GeneralBtn className="card__info__btn card__info__btn__buy">
                Comprar ahora
              </GeneralBtn>
              <GeneralBtn className="card__info__btn card__info__btn__cart">
                Agregar al carrito
              </GeneralBtn>
            </div>
            <hr className="mt-8" />
          </div>
          <div className="card__info__desc__container mt-8 p-4">
            <h1 className="card__info__desc__title text-2xl">Descripción</h1>
            <div className="card__info__desc mt-10">
              {productById?.descripcion}
            </div>
          </div>
        </ProductCard>
      </div>
    </section>
  );
}
