import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { ProductCard } from "../../components/productCard/ProductCard";
import { Loader } from "../../components/loader/Loader";
import { UserContext } from "../../context/UserContext";
import { Pagination } from "../../components/pagination/Pagination.jsx";
import star from "/imgs/aplication/estrella.png";

export function AllProducts() {
  const { handleProductDetail, loading, products, page } =
    useContext(ProductContext);
  const [orderBy, setOrderBy] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  let sortedProducts = [...products];

  const handleSortChange = (event) => {
    setOrderBy(event.target.value);
  };

  useEffect(() => {
    if (navigate) {
      setOrderBy("");
    }
  }, [navigate]);

  if (orderBy === "menorPrecio") {
    sortedProducts.sort((a, b) => a.precio - b.precio);
  } else if (orderBy === "mayorPrecio") {
    sortedProducts.sort((a, b) => b.precio - a.precio);
  }

  useEffect(() => {
    if (page !== 1) {
      window.scrollTo(0, 0);
    }
  }, [page]);

  return (
    <div className="product__list__container">
      <div className="products__container">
        <h1 className="products__title text-2xl font-normal">
          Todos los productos
        </h1>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className="product__list__filters">
              <select
                onChange={handleSortChange}
                className="products__filter shadow-sm rounded-md py-1 px-2 w-56 text-center my-10 border border-gray-300"
                name="orderBy"
                id="orderBy"
                value={orderBy}
              >
                <option className="text-start cursor-pointer" value="">
                  Ordenar por
                </option>
                <option
                  className="text-start cursor-pointer"
                  value="menorPrecio"
                >
                  Menor precio
                </option>
                <option
                  className="text-start cursor-pointer"
                  value="mayorPrecio"
                >
                  Mayor precio
                </option>
              </select>
              <Pagination />
            </div>
            <div className="products__cards__container">
              {sortedProducts?.map((product) => (
                <ProductCard
                  onClick={() => handleProductDetail(product?.id)}
                  key={product?.id}
                  className="products__card shadow-md bg-white"
                >
                  <div className="products__card__img__container">
                    {user?.id === product?.vendedor ? (
                      <figure className="product__star__container">
                        <span className="font-semibold">Mi producto</span>
                        <img
                          className="product__star__icon"
                          src={star}
                          alt=""
                        />
                      </figure>
                    ) : (
                      ""
                    )}
                    <img
                      className="products__card__img"
                      src={
                        product?.imagen
                          ? product?.imagen
                          : "/imgs/aplication/img-notfound.png"
                      }
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
        <Pagination />
      </div>
    </div>
  );
}
