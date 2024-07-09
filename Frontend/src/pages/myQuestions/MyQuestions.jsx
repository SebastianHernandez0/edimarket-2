import { useContext, useEffect, useState } from "react";
import "../myQuestions/myQuestions.css";
import { UserContext } from "../../context/UserContext";
import { ProductContext } from "../../context/ProductContext";
import { HiDotsVertical } from "react-icons/hi";
import { QuestionModal } from "../../components/questionModal/QuestionModal";

export function MyQuestions() {
  const { user, userToken } = useContext(UserContext);
  const { loading, setLoading } = useContext(ProductContext);

  const [product, setProduct] = useState([]);

  const handleGetProductWithQuestions = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/productos/producto/${user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error al obtener productos con preguntas"
        );
      }
      const data = await response.json();
      setProduct(data.productos);
      return data;
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProductWithQuestions();
  }, []);

  return (
    <section className="myquestions___container bg-white shadow-sm rounded-sm">
      <h1 className="text-2xl font-semibold mb-5">Mis preguntas realizadas</h1>
      <div className="myquestions__body flex flex-col gap-5">
        {product.map((element) => {
          return (
            <div
              className="border p-4 rounded-md shadow-sm"
              key={element?.producto_id}
            >
              <div className="flex items-center gap-2 relative">
                <div className="border p-2 rounded-md shadow">
                  <img
                    className="w-[80px] object-cover "
                    src={element?.imagen}
                    alt=""
                  />
                </div>
                <div className="flex items-center justify-between w-full overflow-hidden h-[40px]">
                  <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[150px] md:max-w-full ">
                    {element?.titulo}
                  </p>
                  <HiDotsVertical className="cursor-pointer scale-[1.8] select-none hover:bg-slate-200 rounded-full mr-2" />
                  <QuestionModal />
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex flex-col gap-2">
                {element?.preguntas.map((pregunta) => {
                  return (
                    <div
                      key={pregunta?.id_pregunta}
                      className="flex items-center gap-3 ml-3 font-medium overflow-hidden"
                    >
                      <p className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[180px] sm:max-w-full">
                        • {pregunta?.pregunta}
                      </p>
                      <span className="text-sm text-gray-500">
                        {pregunta?.fecha}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
