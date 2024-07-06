import { GeneralBtn } from "../generalBtn/GeneralBtn";

export function QuestionEditoModal({
  setSelectedQuestionToEdit,
  setEditQuestion,
  setSelectedQuestionId,
}) {
  const handleCloseModal = () => {
    setEditQuestion(false);
    setSelectedQuestionToEdit("");
    setSelectedQuestionId("");
  };
  return (
    <div className="flex items-center gap-2 shadow border rounded-md py-2 px-4">
      <input
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
    </div>
  );
}
