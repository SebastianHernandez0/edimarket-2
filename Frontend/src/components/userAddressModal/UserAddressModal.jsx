import "../userAddressModal/userAddressModal.css";
import { forwardRef } from "react";

export const UserAddressModal = forwardRef((props, ref) => {
  return (
    <section
      ref={ref}
      className="addressmodal__container bg-white shadow-sm rounded-md border"
    >
      <button className="edit__btn w-full font-medium">Editar</button>
      <button className="edit__btn w-full font-medium">Eliminar</button>
    </section>
  );
});
