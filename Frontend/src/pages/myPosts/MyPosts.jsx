import { useContext } from "react";
import { ProductCard } from "../../components/productCard/ProductCard";
import "../myPosts/myPosts.css";
import { ProductContext } from "../../context/ProductContext";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { TbEdit } from "react-icons/tb";
import { FaTrashCan } from "react-icons/fa6";

export function MyPotsts() {
  const { products } = useContext(ProductContext);

  const myProducts = products.filter((product) => product.vendedor === 12);

  return (
    <section className="myposts__container bg-white shadow-sm">
      <h1 className="text-2xl font-semibold mb-5">Mis publicaciones</h1>
      <div className="myposts__body flex flex-col gap-5">
        {myProducts?.map((product) => (
          <ProductCard
            className="border p-5 rounded-md flex flex-col gap-4"
            key={product.id}
          >
            <div className="myposts__card__body flex items-start gap-5">
              <img
                className="myposts__card__img  border rounded-md"
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
                <p className="text-sm text-gray-400 mt-3">Publicado en Edimarket</p>
              </div>
            </div>
            <div className="myposts__btn__container">
              <GeneralBtn className="myposts__btn" type="secondary">
                <TbEdit className="btn__edit" />
              </GeneralBtn>
              <GeneralBtn className="myposts__btn" type="secondary">
                <FaTrashCan className="btn__trash" />
              </GeneralBtn>
            </div>
          </ProductCard>
        ))}
      </div>
    </section>
  );
}
