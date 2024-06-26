import "../myPosts/myPosts.css";
import { useContext, useEffect } from "react";
import { ProductCard } from "../../components/productCard/ProductCard";
import { ProductContext } from "../../context/ProductContext";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { TbEdit } from "react-icons/tb";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components/loader/Loader";
import { UserContext } from "../../context/UserContext";
import postImg from "/imgs/aplication/posts.png";

export function MyPotsts() {
  const { loading } = useContext(ProductContext);
  const { user, myProducts } = useContext(UserContext);
  const navigate = useNavigate();

  const handleEditProduct = (id) => {
    navigate(`/edit-post/${id}`);
  };

  return (
    <section className="myposts__container bg-white shadow-sm">
      <h1 className="text-2xl font-semibold mb-5">Mis publicaciones</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="myposts__body flex flex-col gap-5 h-full">
          {myProducts.length > 0 ? (
            myProducts.map((product) => (
              <ProductCard
                className="border p-5 rounded-md flex flex-col gap-4"
                key={product.productoId}
              >
                <div className="myposts__card__body flex items-start gap-5">
                  <img
                    className="myposts__card__img border rounded-md"
                    src={product?.imagen}
                    alt=""
                  />
                  <div className="myposts__card__info flex flex-col gap-1 overflow-hidden">
                    <p className="myposts__card__paragraph text-md font-medium text-lg">
                      {product?.nombre}
                    </p>
                    <p className="myposts__card__info font-medium">
                      {product?.precio.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })}
                    </p>
                    <p className="text-sm text-gray-400 mt-3">
                      Publicado en Edimarket
                    </p>
                  </div>
                </div>
                <div className="myposts__btn__container">
                  <GeneralBtn
                    onClick={() => handleEditProduct(product?.productoId)}
                    className="myposts__btn"
                    type="secondary"
                  >
                    <TbEdit className="btn__edit" />
                  </GeneralBtn>
                  <GeneralBtn className="myposts__btn" type="secondary">
                    <FaTrashCan className="btn__trash" />
                  </GeneralBtn>
                </div>
              </ProductCard>
            ))
          ) : (
            <div className="grid items-center justify-items-center gap-7">
              <span className="text-center text-2xl font-semibold">
                Aún no haz publicado.
              </span>
              <p className=" text-center">
                Cuando vendas tus publicaciones aparecerán aquí.
              </p>
              <img className="post__img" src={postImg} alt="" />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
