export function QuestionModal() {
  return (
    <div className="questionmodal__container absolute top-[50px] right-[20px] border flex justify-center flex-col gap-2  z-50 rounded-md shadow bg-gray-100 overflow-hidden">
      <p className="hover:bg-teal-300 rounded-sm cursor-pointer py-2 px-3 text-sm font-medium">
        Eliminar preguntas
      </p>
      <p className="hover:bg-teal-300 rounded-sm cursor-pointer py-2 px-3 text-sm font-medium">
        Reportar preguntas
      </p>
    </div>
  );
}
