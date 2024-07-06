import { useContext, useEffect, useState } from "react";
import { GeneralBtn } from "../generalBtn/GeneralBtn";
import { ProductContext } from "../../context/ProductContext";

export function QuestionEditoModal({
  setSelectedQuestionToEdit,
  setEditQuestion,
  setSelectedQuestionId,
  selectedQuestionToEdit,
}) {
  const { questionsByProductId } = useContext(ProductContext);
  const [question, setQuestion] = useState("");
  const [questionData, setQuestioData] = useState("");

  const handleCloseModal = () => {
    setEditQuestion(false);
    setSelectedQuestionToEdit("");
    setSelectedQuestionId("");
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
        errorPreguntas: "Ingresa mínimo 8 caracteres",
      }));
    } else {
      const res = await handleSendQuestion();
      handleGetQuestionsByProductId();
      setUserData(initialUserData);
    }
  };

  useEffect(() => {
    const filteredId = questionsByProductId.find(
      (question) => question.id === selectedQuestionToEdit
    );
    if (filteredId) {
      setQuestioData(filteredId.pregunta);
    }
  }, []);

  return (
    <div className="">
      <form className="flex items-center gap-2 shadow border rounded-md py-2 px-4">
        <input
          value={questionData}
          onChange={(e) => {
            setQuestioData(e.target.value);
          }}
          className="input w-full"
          style={{ height: "40px" }}
          placeholder="Edita tu pregunta..."
          type="text"
        />
        <GeneralBtn
          onClick={handleCloseModal}
          className="h-[40px] w-[80px] flex items-center justify-center text-sm"
          type="primary"
        >
          Guardar
        </GeneralBtn>
      </form>
    </div>
  );
}
