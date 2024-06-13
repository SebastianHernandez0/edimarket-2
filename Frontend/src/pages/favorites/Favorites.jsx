import { useContext } from "react";
import "../favorites/favorites.css";
import { ProductContext } from "../../context/ProductContext";
import { ProductCard } from "../../components/productCard/ProductCard";

export function Favorites() {
  const { handleProductDetail, addedToFav } = useContext(ProductContext);

  const hanldeDeleteFav = (event) => {
    event.stopPropagation();
  };

  return (
    <section className="favorites__container bg-white shadow-sm">
      <h1 className="favorites__title text-2xl font-semibold">Mis favoritos</h1>
      <div className="favorites__cards__container">
        {addedToFav.length > 0 ? (
          addedToFav.map((product) => {
            return (
              <ProductCard
                onClick={() => handleProductDetail(product?.id)}
                key={product.id}
              >
                <div className="favorites__card__body">
                  <img
                    className="favorites__card__img shadow-md"
                    src={product.href}
                    alt=""
                  />
                  <div className="favorites__card__info">
                    <p className="favorites__card__paragraph text-md font-light text-lg">
                      {product.nombre}
                    </p>
                    <p className="favorites__card__info">
                      {product.precio.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })}
                    </p>
                    <button
                      onClick={(e) => hanldeDeleteFav(e)}
                      className="favorites__card__info__btn font-bold text-blue-400"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </ProductCard>
            );
          })
        ) : (
          <div className="nofavorites__container">
            <h1 className="nofavorites__title text-center font-semibold text-3xl">
              Aún no tienes favoritos
            </h1>
            <p className="nofavorites__paragraph text-center">
              Cuando añadas productos a favoritos aparererán acá.
            </p>
            <img className="nofavorites__icon" src="/imgs/aplication/fav_heart.png" alt="" />
          </div>
        )}
      </div>
    </section>
  );
}
