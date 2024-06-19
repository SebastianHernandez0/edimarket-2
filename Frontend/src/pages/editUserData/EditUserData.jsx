import { useContext, useRef, useState, useEffect } from "react";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import "../editUserData/editUserData.css";
import { UserContext } from "../../context/UserContext";

export function EditUserData() {
  const {
    emailRegex,
    rutFormatRegex,
    onlyNumbersRegex,
    userData,
    handleChange,
    inputRefs,
    inputFormError,
    setInputFormError,
  } = useContext(UserContext);

  const handleEditData = (e) => {
    e.preventDefault();

    setInputFormError({
      errorNombre: "",
      errorRut: "",
      errorTelefono: "",
      errorEmail: "",
    });

    // Validar cada campo uno por uno
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
    } else if (userData.rut.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorRut: "Ingresa tu RUT. sin puntos con guión",
      }));
    } else if (!rutFormatRegex.test(userData.rut.trim())) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorRut: "Ingresa un RUT válido. sin puntos con guión",
      }));
    } else if (userData.telefono.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorTelefono: "Ingresa tu teléfono.",
      }));
    } else if (!onlyNumbersRegex.test(userData.telefono.trim())) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorTelefono: "Ingresa solo números.",
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
    } else {
      setSingUpSuccess("Datos actualizados con éxito");
    }
  };

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
              onChange={handleChange}
              className={`data__input ${
                inputFormError.errorNombre
                  ? "focus: outline-2 outline outline-red-600"
                  : "focus: outline-2 outline-green-300"
              }`}
              name="nombre"
              type="text"
            />
            {userData.nombre.trim() === "" ||
            userData.nombre.trim().length < 10 ? (
              <p className="text-red-600 font-semibold text-sm ml-7">
                {inputFormError.errorNombre}
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
              onChange={handleChange}
              className={`data__input ${
                inputFormError.errorRut
                  ? "focus: outline-2 outline outline-red-600"
                  : "focus: outline-2 outline-green-300"
              }`}
              name="rut"
              type="text"
            />
            {userData.rut.trim() === "" ||
            !rutFormatRegex.test(userData.rut.trim()) ? (
              <p className="text-red-600 font-semibold text-sm ml-7">
                {inputFormError.errorRut}
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
              onChange={handleChange}
              className={`data__input ${
                inputFormError.errorTelefono
                  ? "focus: outline-2 outline outline-red-600"
                  : "focus: outline-2 outline-green-300"
              }`}
              name="telefono"
              type="text"
            />
            {userData.telefono.trim() === "" ||
            !onlyNumbersRegex.test(userData.telefono.trim()) ? (
              <p className="text-red-600 font-semibold text-sm ml-7">
                {inputFormError.errorTelefono}
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
              onChange={handleChange}
              className={`data__input ${
                inputFormError.errorEmail
                  ? "focus: outline-2 outline outline-red-600"
                  : "focus: outline-2 outline-green-300"
              }`}
              name="email"
              type="text"
            />
            {userData.email.trim() === "" ||
            !emailRegex.test(userData.email.trim()) ? (
              <p className="text-red-600 font-semibold text-sm ml-7">
                {inputFormError.errorEmail}
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
