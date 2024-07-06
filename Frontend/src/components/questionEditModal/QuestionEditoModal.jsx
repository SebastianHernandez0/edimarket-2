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
  const [questionData, setQuestioData] = useState("");
  const [errorQuestionData, setErrorQuestionData] = useState("");

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();

    if (questionData.trim() === "") {
      setErrorQuestionData("Modifica tu pregunta.");
    } else if (questionData.trim().length < 5) {
      setErrorQuestionData("Ingresa mínimo 5 caracteres.");
    } else {
      setEditQuestion(false);
      setSelectedQuestionToEdit("");
      setSelectedQuestionId("");
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

  useEffect(() => {
    if (questionData !== "") {
      setErrorQuestionData("");
    }
  }, [questionData]);

  return (
    <div className="">
      <form
        onSubmit={handleSubmitQuestion}
        className="flex items-start gap-2 shadow border rounded-md py-2 px-4"
      >
        <div>
          <input
            value={questionData}
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
      </form>
    </div>
  );
}
