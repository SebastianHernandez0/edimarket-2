import { useContext, useRef, useState, useEffect } from "react";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import "../editUserData/editUserData.css";
import { UserContext } from "../../context/UserContext";

export function EditUserData() {
  const { emailRegex, rutFormatRegex, onlyNumbersRegex } =
    useContext(UserContext);

  const [userData, setUserData] = useState({
    nombre: "",
    rut: "",
    telefono: "",
    email: "",
  });
  const [userDataError, setUserDataError] = useState({
    errorNombre: "",
    errorRut: "",
    errorTelefono: "",
    errorEmail: "",
  });
  const inputRefs = {
    nombre: useRef(null),
    rut: useRef(null),
    telefono: useRef(null),
    email: useRef(null),
  };

  const handleEditData = (e) => {
    e.preventDefault();

    setUserDataError({
      errorNombre: "",
      errorRut: "",
      errorTelefono: "",
      errorEmail: "",
    });

    // Validar cada campo uno por uno
    if (userData.nombre.trim() === "") {
      setUserDataError((prevErrors) => ({
        ...prevErrors,
        errorNombre: "Ingresa tu nombre.",
      }));
    } else if (userData.nombre.trim().length < 10) {
      setUserDataError((prevErrors) => ({
        ...prevErrors,
        errorNombre: "Ingresa tu nombre completo.",
      }));
    } else if (userData.rut.trim() === "") {
      setUserDataError((prevErrors) => ({
        ...prevErrors,
        errorRut: "Ingresa tu RUT. sin puntos con guión",
      }));
    } else if (!rutFormatRegex.test(userData.rut.trim())) {
      setUserDataError((prevErrors) => ({
        ...prevErrors,
        errorRut: "Ingresa un RUT válido. sin puntos con guión",
      }));
    } else if (userData.telefono.trim() === "") {
      setUserDataError((prevErrors) => ({
        ...prevErrors,
        errorTelefono: "Ingresa tu teléfono.",
      }));
    } else if (!onlyNumbersRegex.test(userData.telefono.trim())) {
      setUserDataError((prevErrors) => ({
        ...prevErrors,
        errorTelefono: "Ingresa solo números.",
      }));
    } else if (userData.email.trim() === "") {
      setUserDataError((prevErrors) => ({
        ...prevErrors,
        errorEmail: "Ingresa tu correo electrónico.",
      }));
    } else if (!emailRegex.test(userData.email.trim())) {
      setUserDataError((prevErrors) => ({
        ...prevErrors,
        errorEmail: "Ingresa un correo electrónico válido.",
      }));
    } else {
      setSingUpSuccess("Datos actualizados con éxito");
    }
  };

  const handleUserData = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Función para determinar si se debe enfocar algún input
    const shouldFocusInput = () => {
      return (
        userDataError.errorNombre ||
        userDataError.errorRut ||
        userDataError.errorTelefono ||
        userDataError.errorEmail
      );
    };

    // Enfocar el input correspondiente si hay algún error
    if (shouldFocusInput()) {
      if (userDataError.errorNombre) {
        inputRefs.nombre.current.focus();
      } else if (userDataError.errorRut) {
        inputRefs.rut.current.focus();
      } else if (userDataError.errorTelefono) {
        inputRefs.telefono.current.focus();
      } else if (userDataError.errorEmail) {
        inputRefs.email.current.focus();
      }
    }
  }, [userDataError]);

  useEffect(() => {
    if (
      userData.nombre !== "" ||
      userData.rut !== "" ||
      userData.telefono !== "" ||
      userData.email !== ""
    ) {
      setUserDataError({
        errorNombre: "",
        errorRut: "",
        errorTelefono: "",
        errorEmail: "",
      });
    }
  }, [userData]);

  return (
    <section className="edituserdata__container bg-white shadow-sm rounded-sm">
      <h1 className="mb-5">Edita y guarda tus datos</h1>
      <div className="edituserdata__body">
        <form
          onSubmit={handleEditData}
          className="edituserdata__form border rounded-md py-5 px-3 flex flex-col gap-5"
        >
          <div>
            <label className="font-semibold" htmlFor="">
              Nombre y apellido
            </label>
            <input
              ref={inputRefs.nombre}
              value={userData.nombre}
              onChange={handleUserData}
              className={`data__input ${
                userDataError.errorNombre
                  ? "focus: outline-2 outline outline-red-600"
                  : "focus: outline-2 outline-green-300"
              }`}
              name="nombre"
              type="text"
            />
            {userData.nombre.trim() === "" ||
            userData.nombre.trim().length < 10 ? (
              <p className="text-red-600 font-semibold text-sm ml-7">
                {userDataError.errorNombre}
              </p>
            ) : (
              ""
            )}
          </div>
          <div>
            <label className="font-semibold" htmlFor="">
              RUT
            </label>
            <input
              ref={inputRefs.rut}
              value={userData.rut}
              onChange={handleUserData}
              className={`data__input ${
                userDataError.errorRut
                  ? "focus: outline-2 outline outline-red-600"
                  : "focus: outline-2 outline-green-300"
              }`}
              name="rut"
              type="text"
            />
            {userData.rut.trim() === "" ||
            !rutFormatRegex.test(userData.rut.trim()) ? (
              <p className="text-red-600 font-semibold text-sm ml-7">
                {userDataError.errorRut}
              </p>
            ) : (
              ""
            )}
          </div>
          <div>
            <label className="font-semibold" htmlFor="">
              Telefono
            </label>
            <input
              ref={inputRefs.telefono}
              value={userData.telefono}
              onChange={handleUserData}
              className={`data__input ${
                userDataError.errorTelefono
                  ? "focus: outline-2 outline outline-red-600"
                  : "focus: outline-2 outline-green-300"
              }`}
              name="telefono"
              type="text"
            />
            {userData.telefono.trim() === "" ||
            !onlyNumbersRegex.test(userData.telefono.trim()) ? (
              <p className="text-red-600 font-semibold text-sm ml-7">
                {userDataError.errorTelefono}
              </p>
            ) : (
              ""
            )}
          </div>
          <div>
            <label className="font-semibold" htmlFor="">
              Email
            </label>
            <input
              ref={inputRefs.email}
              value={userData.email}
              onChange={handleUserData}
              className={`data__input ${
                userDataError.errorEmail
                  ? "focus: outline-2 outline outline-red-600"
                  : "focus: outline-2 outline-green-300"
              }`}
              name="email"
              type="text"
            />
            {userData.email.trim() === "" ||
            !emailRegex.test(userData.email.trim()) ? (
              <p className="text-red-600 font-semibold text-sm ml-7">
                {userDataError.errorEmail}
              </p>
            ) : (
              ""
            )}
          </div>
          <GeneralBtn className="text-center self-center" type="secondary">
            Guardar
          </GeneralBtn>
        </form>
      </div>
    </section>
  );
}
