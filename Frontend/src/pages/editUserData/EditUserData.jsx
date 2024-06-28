import { useContext, useEffect, useState } from "react";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import "../editUserData/editUserData.css";
import { UserContext } from "../../context/UserContext";
import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

export function EditUserData() {
  const {
    emailRegex,
    userData,
    handleChange,
    inputRefs,
    inputFormError,
    setInputFormError,
    user,
    userToken,
    logout,
  } = useContext(UserContext);
  const { setLoading } = useContext(ProductContext);
  const [userDataIcon, setUserDataIcon] = useState(false);
  const navigate = useNavigate();
  const [editSucces, setEditSucces] = useState({
    success: "",
    error: "",
  });

  const handleUserDataIcon = () => {
    setUserDataIcon(!userDataIcon);
  };

  const handleUpdateUserData = async (nombre, email, contraseña) => {
    try {
      setLoading(true);
      const response = await fetch("https://edimarket.onrender.com/usuarios", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ nombre, email, contraseña }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al editar usuario");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEditData = async (e) => {
    e.preventDefault();

    setInputFormError({
      errorNombre: "",
      errorEmail: "",
    });

    if (userData.nombre.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorNombre: "Ingresa tu nombre.",
      }));
    } else if (userData.nombre.trim().length < 10) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorNombre: "Ingresa tu nombre completo.",
      }));
    } else if (userData.email.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorEmail: "Ingresa tu correo electrónico.",
      }));
    } else if (!emailRegex.test(userData.email.trim())) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorEmail: "Ingresa un correo electrónico válido.",
      }));
    } else if (userData.contraseña.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorContraseña: "Ingresa tu contraseña.",
      }));
    } else if (userData.contraseña.length < 8) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorContraseña: "Ingresa mínimo 8 caracteres.",
      }));
    } else if (userData.confirmContraseña.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorConfirmContraseña: "Confirma tu contraseña.",
      }));
    } else if (
      userData.contraseña.trim() !== userData.confirmContraseña.trim()
    ) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorConfirmContraseña: "Las contraseñas no coinciden.",
      }));
    } else {
      try {
        const res = await handleUpdateUserData(
          userData.nombre,
          userData.email,
          userData.contraseña
        );
        setEditSucces((prevData) => ({
          ...prevData,
          success: "Datos actualizados con éxito.",
        }));
        setTimeout(() => {
          logout();
        }, 1500);
      } catch (error) {
        console.error("Error:", error.message);
        setEditSucces((prevData) => ({
          ...prevData,
          error: "No pudimos actualizar tus datos.",
        }));
      }
    }
  };

  useEffect(() => {
    if (navigate) {
      setEditSucces({
        success: "",
        error: "",
      });
    }
  }, [navigate]);

  return (
    <section className="edituserdata__container bg-white shadow-sm rounded-sm">
      <h1 className="mb-5">Edita y guarda tus datos</h1>
      <div className="edituserdata__body">
        <form
          onSubmit={handleSubmitEditData}
          className="edituserdata__form border rounded-md py-5 px-3 flex flex-col gap-5"
        >
          <div className="user__input__container">
            <label className="font-semibold" htmlFor="">
              Nombre y apellido
            </label>
            <input
              ref={inputRefs.nombre}
              value={userData.nombre}
              onChange={handleChange}
              className={`data__input ${
                inputFormError.errorNombre
                  ? "focus: outline-2 outline outline-red-600"
                  : "focus: outline-2 outline-green-300"
              }`}
              name="nombre"
              type="text"
            />
            {inputFormError.errorNombre ? (
              <p className="text-red-600 font-semibold text-sm ml-7">
                {inputFormError.errorNombre}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="user__input__container">
            <label className="font-semibold" htmlFor="">
              Email
            </label>
            <input
              ref={inputRefs.email}
              value={userData.email}
              onChange={handleChange}
              className={`data__input ${
                inputFormError.errorEmail
                  ? "focus: outline-2 outline outline-red-600"
                  : "focus: outline-2 outline-green-300"
              }`}
              name="email"
              type="text"
            />
            {inputFormError.errorEmail ? (
              <p className="text-red-600 font-semibold text-sm ml-7">
                {inputFormError.errorEmail}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="user__input__container">
            <label className="font-semibold" htmlFor="">
              Contraseña
            </label>
            <input
              ref={inputRefs.contraseña}
              value={userData.contraseña}
              onChange={handleChange}
              className={`data__input ${
                inputFormError.errorContraseña
                  ? "focus: outline-2 outline outline-red-600"
                  : "focus: outline-2 outline-green-300"
              }`}
              name="contraseña"
              type={userDataIcon ? "text" : "password"}
            />
            {inputFormError.errorContraseña ? (
              <p className="text-red-600 font-semibold text-sm ml-7">
                {inputFormError.errorContraseña}
              </p>
            ) : (
              ""
            )}
            {userDataIcon ? (
              <HiEye
                onClick={handleUserDataIcon}
                className="input__eye__icon__user"
              />
            ) : (
              <HiEyeOff
                onClick={handleUserDataIcon}
                className="input__eye__icon__user"
              />
            )}
          </div>
          <div className="user__input__container">
            <label className="font-semibold" htmlFor="">
              Confirma tu contraseña
            </label>
            <input
              ref={inputRefs.confirmContraseña}
              name="confirmContraseña"
              onChange={handleChange}
              value={userData.confirmContraseña}
              className={`data__input ${
                inputFormError.errorConfirmContraseña
                  ? "focus: outline-2 outline outline-red-600"
                  : "focus: outline-2 outline-green-300"
              }`}
              type={userDataIcon ? "text" : "password"}
            />
            {inputFormError.errorConfirmContraseña ? (
              <p className="text-red-600 font-semibold text-sm ml-7">
                {inputFormError.errorConfirmContraseña}
              </p>
            ) : (
              ""
            )}

            {userDataIcon ? (
              <HiEye
                onClick={handleUserDataIcon}
                className="input__eye__icon__user"
              />
            ) : (
              <HiEyeOff
                onClick={handleUserDataIcon}
                className="input__eye__icon__user"
              />
            )}
          </div>
          {editSucces.success ? (
            <p className="font-bold text-green-600 text-center">
              {editSucces.success}
            </p>
          ) : (
            <p className="font-bold text-red-600 text-center">
              {editSucces.error}
            </p>
          )}

          <GeneralBtn className="text-center self-center" type="secondary">
            Guardar
          </GeneralBtn>
        </form>
      </div>
    </section>
  );
}
