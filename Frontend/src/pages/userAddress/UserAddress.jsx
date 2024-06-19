import "../userAddress/userAddress.css";
import { HiHome } from "react-icons/hi2";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { UserAddressModal } from "../../components/userAddressModal/UserAddressModal";

export function UserAddress() {
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(!openEditModal);
  };

  return (
    <section className="useraddress__container bg-white shadow-sm rounded-sm">
      <h1 className="text-2xl font-semibold mb-5">Direcciones</h1>
      {/*Acá se mapea ya que podrán haber más de una dirección*/}
      <div className="useradress__body flex justify-between">
        <div className="w-full">
          <hr className="w-full" />
          <div className="direccion flex flex-col gap-2 my-3">
            <div className="flex gap-2 items-center font-medium">
              <HiHome className="text-2xl" />
              <span>
                Titan <span>4380</span> departamento 403, piso 4 torre 3
              </span>
            </div>
            <div className="region-comuna pl-8 text-sm">
              <span className="">Región</span> <span>Metropolitana</span>
            </div>
            <span className="usuario pl-8 text-sm">
              Edison Venegas Espinoza
            </span>
          </div>
        </div>
        <div className="edit__icon">
          <HiDotsVertical
            onClick={handleOpenEditModal}
            className="text-xl mt-3 cursor-pointer"
          />
          {openEditModal ? <UserAddressModal /> : null}
        </div>
      </div>

      {/*No incluir el hr en el mapeo*/}
      <hr />
      <button className="add__btn text-normal justify-self-end self-end mt-3 font-semibold text-teal-500">
        Agregar dirección
      </button>
    </section>
  );
}
