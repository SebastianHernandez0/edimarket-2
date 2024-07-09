import { useContext, useEffect, useState } from "react";
import "../myQuestions/myQuestions.css";
import { UserContext } from "../../context/UserContext";
import { ProductContext } from "../../context/ProductContext";

export function MyQuestions() {
  const { questionsByUser, user, userToken } = useContext(UserContext);
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
      console.log(data.productos);
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
      <div className="myquestions__body">
        {questionsByUser.map((question) => {
          return (
            <div className="" key={question?.id}>
              <p>{question?.pregunta}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
