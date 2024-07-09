import { forwardRef } from "react";

export const QuestionModal = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="questionmodal__container absolute top-[50px] right-[20px] border flex justify-center flex-col gap-2 z-50 rounded-md shadow bg-gray-100 overflow-hidden"
    >
      <p className="hover:bg-teal-200 rounded-sm cursor-pointer py-2 px-3 text-sm font-medium select-none">
        Eliminar preguntas
      </p>
      <p className="hover:bg-teal-200 rounded-sm cursor-pointer py-2 px-3 text-sm font-medium select-none">
        Reportar preguntas
      </p>
    </div>
  );
});
