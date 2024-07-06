import { useContext, useEffect, useRef, useState } from "react";
import { GeneralBtn } from "../generalBtn/GeneralBtn";
import { ProductContext } from "../../context/ProductContext";
import { UserContext } from "../../context/UserContext";
import { IoMdCloseCircle } from "react-icons/io";

export function QuestionEditoModal({
  setSelectedQuestionToEdit,
  setEditQuestion,
  setSelectedQuestionId,
  selectedQuestionToEdit,
}) {
  const { questionsByProductId, handleGetQuestionsByProductId } =
    useContext(ProductContext);
  const { userToken, userData } = useContext(UserContext);
  const [questionData, setQuestioData] = useState("");
  const [errorQuestionData, setErrorQuestionData] = useState("");
  const inputRef = useRef(null);

  const handleEditQuestion = async () => {
    try {
      const response = await fetch("http://localhost:3000/usuarios/preguntas", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          idPregunta: selectedQuestionToEdit,
          question: questionData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al editar pregunta");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error.message || "Error al editar pregunta");
    }
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();

    if (questionData.trim() === "") {
      setErrorQuestionData("Modifica tu pregunta.");
    } else if (questionData.trim().length < 5) {
      setErrorQuestionData("Ingresa mínimo 5 caracteres.");
    } else {
      try {
        await handleEditQuestion();
        handleGetQuestionsByProductId();
        setEditQuestion(false);
        setSelectedQuestionToEdit("");
        setSelectedQuestionId("");
      } catch (error) {
        console.error("Error:", error.message);
        throw error;
      }
    }
  };

  useEffect(() => {
    const filteredId = questionsByProductId.find(
      (question) => question.id === selectedQuestionToEdit
    );
    if (filteredId) {
      setQuestioData(filteredId.pregunta);
    }
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (questionData !== "") {
      setErrorQuestionData("");
    }
  }, [questionData]);

  const handleCloseModal = () => {
    setEditQuestion(false);
    setSelectedQuestionToEdit("");
    setSelectedQuestionId("");
  };

  useEffect(() => {
    if (userData.preguntas !== "") {
      handleCloseModal();
    }
  });

  return (
    <form
      onSubmit={handleSubmitQuestion}
      className="flex items-start gap-2 shadow border rounded-md py-2 px-4 relative"
    >
      <div>
        <input
          ref={inputRef}
          value={questionData}
          name="questionData"
          onChange={(e) => {
            setQuestioData(e.target.value);
          }}
          className={`input w-full  ${
            errorQuestionData
              ? "focus: outline-2 outline outline-red-600"
              : "focus: outline-2 outline-green-300"
          }`}
          style={{ height: "40px" }}
          placeholder="Edita tu pregunta..."
          type="text"
        />
        {errorQuestionData ? (
          <p className="text-red-600 font-semibold text-sm ml-3">
            {errorQuestionData}
          </p>
        ) : (
          ""
        )}
      </div>
      <GeneralBtn
        className="h-[40px] w-[80px] flex items-center justify-center text-sm"
        type="primary"
      >
        Guardar
      </GeneralBtn>
      <IoMdCloseCircle
        onClick={handleCloseModal}
        className="absolute -top-4 -right-4 scale-[1.5] cursor-pointer"
      />
    </form>
  );
}
