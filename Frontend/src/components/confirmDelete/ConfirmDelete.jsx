import React, { forwardRef } from "react";
import { GeneralBtn } from "../generalBtn/GeneralBtn";

export const ConfirmDelete = forwardRef(
  (
    {
      modalContentRef,
      setConfirmDeleteId,
      handleDeleteMyProduct,
      CloseIcon,
      confirmDeleteId,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="confirm__delete__modal bg-white shadow-sm p-3 rounded-md flex flex-col items-stretch gap-4 border"
      >
        <CloseIcon
          ref={modalContentRef.iconRef}
          onClick={() => {
            setConfirmDeleteId(false);
          }}
          className="close__icon"
        />
        <h2 className="text-center">Eliminar publicación</h2>
        <hr />
        <span className="text-center font-medium text-sm">
          ¿Seguro que quieres eliminar la publicación?
        </span>
        <hr />
        <div className="flex items-center justify-evenly">
          <GeneralBtn
            onClick={() => {
              setConfirmDeleteId(false);
            }}
            type="primary"
            className="confirm__delete__btn"
          >
            Cancelar
          </GeneralBtn>
          <GeneralBtn
            onClick={() => handleDeleteMyProduct(confirmDeleteId)}
            type="primary"
            className="confirm__delete__btn"
          >
            Eliminar
          </GeneralBtn>
        </div>
      </div>
    );
  }
);
