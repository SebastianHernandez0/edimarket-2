import { useNavigate } from "react-router-dom";
import "../userAddressModal/userAddressModal.css";
import { forwardRef } from "react";

export const UserAddressModal = forwardRef(
  ({ handleDeleteAddress, selectedAddressId }, ref) => {
    const navigate = useNavigate();

    const handleNavigateToEditAddress = () => {
      navigate("/edit-address");
    };

    const handleDelete = () => {
      handleDeleteAddress(selectedAddressId);
    };
    return (
      <section
        ref={ref}
        className="addressmodal__container bg-white shadow-sm rounded-md border select-none"
      >
        <button
          onClick={() => handleNavigateToEditAddress(selectedAddressId)}
          className="edit__btn w-full font-medium"
        >
          Editar
        </button>
        <button onClick={handleDelete} className="edit__btn w-full font-medium">
          Eliminar
        </button>
      </section>
    );
  }
);
