import "../userAddress/userAddress.css";
import { HiHome } from "react-icons/hi2";
import { HiDotsVertical } from "react-icons/hi";
import { useRef, useState, forwardRef, useEffect, useContext } from "react";
import { UserAddressModal } from "../../components/userAddressModal/UserAddressModal";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";

const EditIcon = forwardRef((props, ref) => (
  <div ref={ref}>
    <HiDotsVertical {...props} />
  </div>
));

export function UserAddress() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const { users } = useContext(UserContext);
  const navigate = useNavigate();
  const addressRef = {
    iconRef: useRef(null),
    modalRef: useRef(null),
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(!openEditModal);
  };

  const handleClickOutside = (event) => {
    if (
      addressRef.iconRef.current &&
      !addressRef.iconRef.current.contains(event.target) &&
      addressRef.modalRef.current &&
      !addressRef.modalRef.current.contains(event.target)
    ) {
      setOpenEditModal(false);
    }
  };

  useEffect(() => {
    if (openEditModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openEditModal]);

  const handleNavigateToAdd = () => {
    navigate("/add-address");
  };

  return (
    <section className="useraddress__container bg-white shadow-sm rounded-sm">
    {/*   <h1 className="text-2xl font-semibold mb-5">Direcciones</h1>
      {!hasAddress ? (
        <div className="flex flex-col gap-3 items-center sm: my-5">
          <p className="font-semibold">Agrega una dirección de entrega</p>
          <GeneralBtn
            onClick={handleNavigateToAdd}
            type="secondary"
            className=""
          >
            Añadir
          </GeneralBtn>
        </div>
      ) : (
        <div className="useradress__body flex justify-between">
          <div className="w-full">
            <hr className="w-full" />
            <div className="direccion flex flex-col gap-2 my-3">
              <div className="flex gap-2 items-center font-medium">
                <HiHome className="text-2xl" />
                <span>
                  {userId.domicilio.direccion}{" "}
                  <span>{userId.domicilio.numero}</span>
                </span>
              </div>
              <div className="region-comuna pl-8 text-sm">
                <span className="">Región</span>{" "}
                <span>{userId.domicilio.region}</span>
              </div>
              <span className="usuario pl-8 text-sm">{userId.nombre}</span>
            </div>
          </div>
          <div className="edit__icon">
            <EditIcon
              ref={addressRef.iconRef}
              onClick={handleOpenEditModal}
              className="text-xl mt-3 cursor-pointer"
            />
            {openEditModal ? (
              <UserAddressModal ref={addressRef.modalRef} />
            ) : null}
          </div>
        </div>
      )}
      <hr /> */}
    </section>
  );
}
