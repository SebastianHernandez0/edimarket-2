import "../productDetail/productDetail.css";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { ProductCard } from "../../components/productCard/ProductCard";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { IoHeartSharp } from "react-icons/io5";
import { CartContext } from "../../context/CarritoContext";
import { CartAlert } from "../../components/cartAlert/CartAlert";
import { useRef } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { OverlayScreen } from "../../components/overlayScreen/OverlayScreen";
import { UserContext } from "../../context/UserContext";

export function ProductDetail() {
  const {
    productById,
    addedToFav,
    productQuantity,
    handleProductQuantity,
    loading,
    setLoading,
    product,
    setProduct,
    productAlert,
    setProductAlert,
    setProductById,
    handleGetProduct,
    seller,
  } = useContext(ProductContext);
  const { openModalCart, addToCart, cart } = useContext(CartContext);

  const { userToken, handleGetFavs, inputRefs, handleDeleteFav } =
    useContext(UserContext);

  const formatedSellerName = seller[0]?.nombre.split(" ").slice(0, 1);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    handleGetProduct(id);
  }, [id, navigate]);

  const handleAddToFav = async () => {
    try {
      const productFinded = addedToFav.find(
        (product) => product.producto_id === productById.producto_id
      );
      if (!productFinded) {
        const response = await fetch(
          `http://localhost:3000/favoritos/${productById.producto_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
              usuario_id: productById.vendedor_id,
            }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al eliminar el favorito");
        }
        handleGetFavs();
        setProductAlert((prevState) => ({
          ...prevState,
          success: "¡Producto añadido a favoritos!.",
          error: "",
        }));

        inputRefs.timeoutRef.current = setTimeout(() => {
          setProductAlert((prevState) => ({
            ...prevState,
            success: "",
          }));
          inputRefs.timeoutRef.current = null;
        }, 2400);

        const data = response.json();

        return data;
      } else {
        const response = await fetch(
          `http://localhost:3000/favoritos/${productFinded.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
              usuario_id: addedToFav.usuario_id,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al eliminar favorito");
        }

        const data = await response.json();
        handleGetFavs();
        setProductAlert((prevState) => ({
          ...prevState,
          success: "",
          error: "Producto eliminado de favoritos.",
        }));

        inputRefs.timeoutRef.current = setTimeout(() => {
          setProductAlert((prevState) => ({
            ...prevState,
            error: "",
          }));
          inputRefs.timeoutRef.current = null;
        }, 2400);

        return data;
      }
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
    }
  };

  /* const handleAddToCart = () => {
    const productWithQuantity = {
      ...productById,
      cantidad: productQuantity,
    };

    if (!cart.some((product) => product.id === productById.id)) {
      addToCart(productWithQuantity);
      openModalCart();
    } else {
      const productAdded = cart.find(
        (product) => product.id === productById.id
      );
      if (productAdded) {
        setProductAlert((prevState) => ({
          ...prevState,
          error: "Ya añadiste este producto al carrito.",
          success: "",
        }));

        // Cancelamos el temporizador anterior si existe
        if (inputRefs.timeoutRef.current) {
          clearTimeout(inputRefs.timeoutRef.current);
        }

        // Establecemos un nuevo temporizador
        inputRefs.timeoutRef.current = setTimeout(() => {
          setProductAlert((prevState) => ({
            ...prevState,
            error: "",
          }));
          inputRefs.timeoutRef.current = null; // Limpiamos la referencia al temporizador
        }, 2400);
      }
    }
  };
 */

  const handleNavigateToLogin = () => {
    if (!userToken) {
      setProductAlert((prevState) => ({
        ...prevState,
        errorFav: "Para añadir a favoritos inicia sesión o registrate.",
      }));
    }
    inputRefs.timeoutRef.current = setTimeout(() => {
      setProductAlert((prevState) => ({
        ...prevState,
        errorFav: "",
      }));
      inputRefs.timeoutRef.current = null;
    }, 8000);
  };

  useEffect(() => {
    if (navigate) {
      setProductAlert({
        success: "",
        error: "",
        errorFav: "",
      });
    }
  }, [navigate]);

  return (
    <section className="productdetail__container">
      {loading ? (
        <p className="text-center font-semibold text-lg">Cargando...</p>
      ) : (
        <div className="card__container">
          <OverlayScreen />
          <ProductCard className="card__body shadow-md rounded-md">
            <img className="card__img" src={product?.imagen} alt="" />
            <div className="card__info border-2 rounded-md">
              <div className="card__info__details">
                <p className="card__paragraph card__paragraph__name">
                  {product?.nombre}
                </p>
                <div className="card__info__price__details">
                  <p className="card__paragraph card__paragraph__price">
                    {product?.precio
                      ? Number(product.precio).toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })
                      : null}
                  </p>
                  <IoHeartSharp
                    onClick={userToken ? handleAddToFav : handleNavigateToLogin}
                    className={`card__info__like__icon ${
                      addedToFav?.some(
                        (p) => p?.producto_id === product?.producto_id
                      )
                        ? "text-red-600 transition duration-300"
                        : "text-gray-400 transition duration-300"
                    }`}
                  />
                </div>

                <p className="card__paragraph card__paragraph__stock">
                  Stock disponible{" "}
                  <span className="font-semibold">{product?.stock}</span>
                </p>
                <select
                  /*   onChange={handleProductQuantity}
                  value={productQuantity} */
                  className="w-1/2 font-medium mb-5 px-2 border rounded-md active: outline-none cursor-pointer"
                  name="quantity"
                  id=""
                >
                  <option value="1">1 unidad</option>
                  <option value="2">2 unidades</option>
                  <option value="3">3 unidades</option>
                  <option value="4">4 unidades</option>
                  <option value="5">5 unidades</option>
                </select>
                <div className="mb-4 text-sm">
                  <span className="text-gray-400">
                    Estado{" "}
                    <span className="font-medium">
                      {product?.estado
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </span>
                  </span>
                </div>
                <div className="mb-4 text-sm">
                  <span className="text-gray-400">
                    Publicado por{" "}
                    <span className="font-medium">{formatedSellerName}</span>
                  </span>
                </div>
              </div>
              <div className="card__info__btn__container">
                <GeneralBtn
                  className="card__info__btn card__info__btn__buy"
                  type="secondary"
                >
                  <NavLink to="/shipping">Comprar ahora</NavLink>
                </GeneralBtn>
                <GeneralBtn
                  /*   onClick={handleAddToCart} */
                  className="card__info__btn card__info__btn__cart"
                  type="primary"
                >
                  Agregar al carrito
                </GeneralBtn>
              </div>
              <hr className="mt-8" />
            </div>
            <div className="card__info__desc__container mt-8 p-4">
              <h1 className="card__info__desc__title text-2xl">Descripción</h1>
              <div className="card__info__desc mt-10">
                {product?.descripcion}
              </div>
            </div>
          </ProductCard>
          {productAlert.error ? (
            <CartAlert>
              <div>
                <p className="card__cart__alert shadow-md rounded-md bg-slate-700">
                  {productAlert.error}
                </p>
              </div>
            </CartAlert>
          ) : (
            ""
          )}
          {productAlert.success ? (
            <CartAlert>
              <div>
                <p className="card__cart__alert shadow-md rounded-md bg-green-600">
                  {productAlert.success}
                </p>
              </div>
            </CartAlert>
          ) : (
            ""
          )}
          {productAlert.errorFav ? (
            <CartAlert>
              <div className="">
                <div className="card__cart__alert shadow-md rounded-md bg-slate-700 text-sm sm:text-lg">
                  {productAlert.errorFav}{" "}
                  <div className="flex gap-14 items-center justify-center mt-5">
                    <Link
                      className="font-semibold sm:text-sm hover:text-teal-400"
                      to="/sign-in"
                    >
                      INICIAR SESIÓN
                    </Link>
                    <Link
                      className="font-semibold sm:text-sm hover:text-teal-400"
                      to="/sign-up"
                    >
                      REGISTRARSE
                    </Link>
                  </div>
                </div>
              </div>
            </CartAlert>
          ) : (
            ""
          )}
        </div>
      )}
    </section>
  );
}
