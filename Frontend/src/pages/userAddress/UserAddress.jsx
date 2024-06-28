import "../userAddress/userAddress.css";
import { HiHome } from "react-icons/hi2";
import { HiDotsVertical } from "react-icons/hi";
import { useRef, useState, forwardRef, useEffect, useContext } from "react";
import { UserAddressModal } from "../../components/userAddressModal/UserAddressModal";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { Loader } from "../../components/loader/Loader";
import { ProductContext } from "../../context/ProductContext";
import { CartAlert } from "../../components/cartAlert/CartAlert";

const EditIcon = forwardRef((props, ref) => (
  <div ref={ref}>
    <HiDotsVertical {...props} />
  </div>
));

export function UserAddress() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const { user, userAddress, userToken, handleUserAddress } =
    useContext(UserContext);
  const { loading, setLoading } = useContext(ProductContext);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState({
    success: "",
    error: "",
  });
  const navigate = useNavigate();
  const addressRef = {
    iconRef: useRef(null),
    modalRef: useRef(null),
  };

  const handleDeleteAddress = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://edimarket.onrender.com/usuarios/usuario/domicilio/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al editar usuario");
      } else {
        setDeleteSuccess((prevData) => ({
          ...prevData,
          success: "Domicilio eliminado.",
        }));
        setTimeout(() => {
          setDeleteSuccess((prevData) => ({
            ...prevData,
            success: "",
          }));
        }, 1500);
      }
      const data = await response.json();
      handleUserAddress();
      return data;
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditModal = (id) => {
    setSelectedAddressId(id);
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

  useEffect(() => {
    setDeleteSuccess({
      success: "",
      error: "",
    });
  }, [navigate]);

  return (
    <section className="useraddress__container bg-white shadow-sm rounded-sm">
      <h1 className="text-2xl font-semibold mb-5">Direcciones</h1>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {userAddress.length > 0 ? (
            userAddress.map((address) => (
              <div
                key={address.numero_casa}
                className="useradress__body flex justify-between"
              >
                <div className="w-full">
                  <hr className="w-full" />
                  <div className="direccion flex flex-col gap-2 my-3">
                    <div className="flex gap-2 items-center font-medium">
                      <HiHome className="text-2xl" />
                      <span>
                        {address.direccion.charAt(0).toUpperCase() +
                          address.direccion.slice(1)}{" "}
                        <span>{address.numero_casa}</span>
                      </span>
                    </div>
                    <div className="region-comuna pl-8 text-sm">
                      <span className="">Región</span>{" "}
                      <span>
                        {address.region.charAt(0).toUpperCase() +
                          address.region.slice(1)}
                      </span>{" "}
                      <span className="">De Santiago</span>
                    </div>
                    <div className="region-comuna pl-8 text-sm">
                      <span className="">Comuna</span>{" "}
                      <span>
                        {address.comuna
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </span>
                    </div>
                    <span className="usuario pl-8 text-sm">
                      {user.nombre.charAt(0).toUpperCase() +
                        user.nombre.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="edit__icon">
                  <EditIcon
                    ref={addressRef.iconRef}
                    onClick={() => handleOpenEditModal(address.id)}
                    className="text-xl mt-3 cursor-pointer"
                  />
                  {openEditModal ? (
                    <UserAddressModal
                      handleDeleteAddress={handleDeleteAddress}
                      selectedAddressId={selectedAddressId}
                      ref={addressRef.modalRef}
                    />
                  ) : null}
                </div>
              </div>
            ))
          ) : (
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
          )}
          <hr />
        </div>
      )}
      {deleteSuccess.success && (
        <CartAlert>
          <p className="card__perfil__alert shadow-md rounded-md bg-slate-700">
            {deleteSuccess.success}
          </p>
        </CartAlert>
      )}
      {deleteSuccess.error && (
        <CartAlert>
          <p className="card__perfil__alert shadow-md rounded-md bg-red-600">
            {deleteSuccess.error}
          </p>
        </CartAlert>
      )}
    </section>
  );
}
