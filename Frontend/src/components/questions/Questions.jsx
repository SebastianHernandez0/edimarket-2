import "../questions/questions.css";
import { GeneralBtn } from "../generalBtn/GeneralBtn";
import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import { Loader } from "../loader/Loader";
import { HiDotsVertical } from "react-icons/hi";
import { QuestionEditoModal } from "../questionEditModal/QuestionEditoModal";

const EditIcon = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <HiDotsVertical {...props} />
    </div>
  );
});

export function Questions() {
  const {
    questionsByProductId,
    handleGetQuestionsByProductId,
    setLoading,
    loading,
  } = useContext(ProductContext);
  const {
    userData,
    inputFormError,
    setInputFormError,
    setUserData,
    initialUserData,
    handleChange,
    inputRefs,
    userToken,
    user,
  } = useContext(UserContext);
  const respuesta = "";
  const { id } = useParams();
  const [selectedQuestionId, setSelectedQuestionId] = useState("");
  const [selectedQuestionToEdit, setSelectedQuestionToEdit] = useState("");
  const [editQuestion, setEditQuestion] = useState(false);
  const iconRef = useRef(null);
  const modalRef = useRef(null);

  const handleOpenModal = (id) => {
    setSelectedQuestionId(id);
    if (selectedQuestionId) {
      setSelectedQuestionId("");
    }
  };

  const handleSendQuestion = async () => {
    try {
      const response = await fetch("http://localhost:3000/usuarios/preguntas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          idProducto: id,
          pregunta: userData.preguntas,
        }),
      });

      if (!response) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al enviar tu pregunta");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();

    setInputFormError({
      errorPreguntas: "",
    });

    if (userData.preguntas.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorPreguntas: "Ingresa una pregunta",
      }));
    } else if (userData.preguntas.trim().length < 5) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorPreguntas: "Ingresa mínimo 5 caracteres",
      }));
    } else {
      try {
        const res = await handleSendQuestion();
        handleGetQuestionsByProductId();
        setUserData(initialUserData);
      } catch (error) {
        console.error(error.message || "Error al enviar pregunta");
        throw error;
      }
    }
  };

  const handleClickOutside = (e) => {
    if (
      modalRef.current &&
      iconRef.current &&
      !modalRef.current.contains(e.target) &&
      !iconRef.current.contains(e.target)
    ) {
      setSelectedQuestionId("");
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  });

  const handleEditQuestion = (id) => {
    setSelectedQuestionId("");
    setSelectedQuestionToEdit(id);
    if (selectedQuestionToEdit) {
      setEditQuestion(true);
    }
  };

  return (
    <section className="questions__container">
      <h1 className="text-2xl mt-5">Preguntas</h1>
      <div className="">
        <div className="questions__body __container w-full">
          <form
            onSubmit={handleSubmitQuestion}
            className="questions__form__container mt-7"
          >
            <div className="questions__input__body flex flex-col gap-5 md:flex-row items-start">
              <div className="w-full">
                <input
                  ref={inputRefs.preguntasRef}
                  onChange={handleChange}
                  value={userData.preguntas}
                  name="preguntas"
                  className={`input w-full  ${
                    inputFormError.errorPreguntas
                      ? "focus: outline-2 outline outline-red-600"
                      : "focus: outline-2 outline-green-300"
                  }`}
                  type="text"
                  placeholder="Haz una pregunta..."
                />
                {inputFormError.errorPreguntas ? (
                  <p className="text-red-600 font-semibold text-sm ml-3">
                    {inputFormError.errorPreguntas}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <GeneralBtn
                className="w-full h-12 flex items-center justify-center md:w-1/3"
                type="secondary"
              >
                Enviar
              </GeneralBtn>
            </div>
          </form>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div>
            {questionsByProductId.length > 0 ? (
              <div className="ml-5 questions__body mt-10 h-full">
                {questionsByProductId.map((pregunta) => {
                  return (
                    <div key={pregunta.id} className="mb-5">
                      <div className="flex items-center justify-between mt-2 relative">
                        <div>
                          <p className="">{pregunta.pregunta}</p>
                          {selectedQuestionToEdit === pregunta?.id ? (
                            <QuestionEditoModal
                              setSelectedQuestionToEdit={
                                setSelectedQuestionToEdit
                              }
                              selectedQuestionToEdit={selectedQuestionToEdit}
                              setEditQuestion={setEditQuestion}
                              setSelectedQuestionId={setSelectedQuestionId}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <EditIcon
                          ref={
                            selectedQuestionId === pregunta.id ? iconRef : null
                          }
                          onClick={() => handleOpenModal(pregunta.id)}
                          className="scale-[2] cursor-pointer hover:bg-gray-200 p-[3px] rounded-full select-none"
                        />
                        {selectedQuestionId === pregunta.id ? (
                          <div
                            ref={modalRef}
                            className="bg-gray-100 cursor-pointer shadow rounded-md border hover:bg-slate-300 select-none absolute right-8 -top-3"
                          >
                            <p
                              onClick={() => handleEditQuestion(pregunta?.id)}
                              className="font-medium  py-1 px-5"
                            >
                              Editar
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      {respuesta ? (
                        <div className="flex items-center gap-3">
                          <p className="ml-3 text-sm text-gray-400">Sí</p>
                          <p className="text-sm text-gray-400">05/07/2024</p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400  ml-3">
                          Esperando respuesta del vendedor...
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center mt-10">
                <p>Aún no han hecho preguntas sobre este producto.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
