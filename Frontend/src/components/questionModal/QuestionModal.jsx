import { forwardRef, useContext, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { ConfirmDelete } from "../confirmDelete/ConfirmDelete";
import { IoIosClose } from "react-icons/io";
import { GeneralBtn } from "../generalBtn/GeneralBtn";
import { ProductContext } from "../../context/ProductContext";

const ModalIcon = forwardRef((props, ref) => (
  <div ref={ref}>
    <IoIosClose {...props} />
  </div>
));

export const QuestionModal = forwardRef(({ productId, setProductId }, ref) => {
  const { userToken, user } = useContext(UserContext);
  const { setLoading, loading } = useContext(ProductContext);
  const modalRef = useRef(null);
  const iconRef = useRef(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState("");

  const handleDeleteQuestions = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/usuarios/preguntas/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ id: user.id }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar preguntas");
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

  const handleConfirmDeleteQuestions = (productId) => {
    if (productId) {
      handleDeleteQuestions();
    }
  };

  const handleOpenConfirmModal = (id) => {
    if (id) {
      setConfirmDeleteId(id);
    }
  };

  return (
    <div
      ref={ref}
      className="questionmodal__container absolute top-[50px] right-[20px] border flex justify-center flex-col gap-2 z-50 rounded-md shadow bg-gray-100 overflow-hidden"
    >
      <p
        onClick={() => handleOpenConfirmModal(productId)}
        className="hover:bg-teal-200 rounded-sm cursor-pointer py-2 px-3 text-sm font-medium select-none"
      >
        Eliminar preguntas
      </p>
      <p className="hover:bg-teal-200 rounded-sm cursor-pointer py-2 px-3 text-sm font-medium select-none">
        Reportar preguntas
      </p>
      {confirmDeleteId ? (
        <ConfirmDelete
          ref={modalRef}
          className="confirm__delete__modal__card bg-gray-100 shadow-sm p-3 rounded-md flex flex-col items-stretch gap-4 border"
        >
          <ModalIcon
            ref={iconRef}
            onClick={() => {
              setProductId("");
            }}
            className="close__icon"
          />
          <h2 className="text-center">Eliminar preguntas</h2>
          <hr />
          <span className="text-center font-medium text-sm">
            ¿Seguro que quieres eliminar las preguntas?
          </span>
          <hr />
          <div className="flex items-center justify-evenly">
            <GeneralBtn
              onClick={() => {
                setProductId("");
              }}
              type="primary"
              className="confirm__delete__btn"
            >
              Cancelar
            </GeneralBtn>
            <GeneralBtn
              onClick={() => handleConfirmDeleteQuestions(productId)}
              type="primary"
              className="confirm__delete__btn"
            >
              Eliminar
            </GeneralBtn>
          </div>
        </ConfirmDelete>
      ) : (
        ""
      )}
    </div>
  );
});
