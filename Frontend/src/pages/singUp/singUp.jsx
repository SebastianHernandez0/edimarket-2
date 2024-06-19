import "./singUp.css";
import { NavLink } from "react-router-dom";
import { PerfilBtn } from "../../components/perfilBtn/PerfilBtn";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

export function SingUp() {
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
  const [singUpSuccess, setSingUpSuccess] = useState("");

  const handleSingupSubmit = (e) => {
    e.preventDefault();

    // Resetear todos los errores
    setInputFormError({
      errorNombre: "",
      errorRut: "",
      errorTelefono: "",
      errorEmail: "",
      errorContraseña: "",
      errorConfirmContraseña: "",
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
    } else if (userData.contraseña.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorContraseña: "Ingresa tu contraseña.",
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
      setSingUpSuccess("¡Te has registrado con éxito!");
    }
  };

  return (
    <section className="register__container shadow-md rounded-md">
      <div className="register__form__container">
        <form onSubmit={handleSingupSubmit} className="register__form">
          <div className="register__form__title__container">
            <h1 className="register__form__title text-center text-2xl font-medium">
              Bienvenid@s a EdiMarket
            </h1>
            <p className="register__form__paragraph text-center text-sm mt-2">
              Por favor ingresa tus datos para crear tu cuenta
            </p>
          </div>
          <div className="register__form__input__container">
            <div className="register__input__container">
              <input
                ref={inputRefs.nombre}
                name="nombre"
                onChange={handleChange}
                value={userData.nombre}
                className={`register__form__input ${
                  inputFormError.errorNombre
                    ? "focus: outline-2 outline outline-red-600"
                    : "focus: outline-2 outline-green-300"
                }`}
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
              <p className="register__form__input__paragraph text-sm">
                Nombre completo
              </p>
            </div>
            <div className="register__input__container">
              <input
                ref={inputRefs.rut}
                name="rut"
                onChange={handleChange}
                value={userData.rut}
                className={`register__form__input ${
                  inputFormError.errorRut
                    ? "focus: outline-2 outline outline-red-600"
                    : "focus: outline-2 outline-green-300"
                }`}
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
              <p className="register__form__input__paragraph text-sm">Rut</p>
            </div>
            <div className="register__input__container">
              <input
                ref={inputRefs.telefono}
                name="telefono"
                onChange={handleChange}
                value={userData.telefono}
                className={`register__form__input ${
                  inputFormError.errorTelefono
                    ? "focus: outline-2 outline outline-red-600"
                    : "focus: outline-2 outline-green-300"
                }`}
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
              <p className="register__form__input__paragraph text-sm">
                Teléfono
              </p>
            </div>
            <div className="register__input__container">
              <input
                ref={inputRefs.email}
                name="email"
                onChange={handleChange}
                value={userData.email}
                className={`register__form__input ${
                  inputFormError.errorEmail
                    ? "focus: outline-2 outline outline-red-600"
                    : "focus: outline-2 outline-green-300"
                }`}
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
              <p className="register__form__input__paragraph text-sm">Email</p>
            </div>
            <div className="register__input__container">
              <input
                ref={inputRefs.contraseña}
                name="contraseña"
                onChange={handleChange}
                value={userData.contraseña}
                className={`register__form__input ${
                  inputFormError.errorContraseña
                    ? "focus: outline-2 outline outline-red-600"
                    : "focus: outline-2 outline-green-300"
                }`}
                type="password"
              />
              {userData.contraseña.trim() === "" ? (
                <p className="text-red-600 font-semibold text-sm ml-7">
                  {inputFormError.errorContraseña}
                </p>
              ) : (
                ""
              )}
              <p className="register__form__input__paragraph text-sm">
                Contraseña
              </p>
            </div>
            <div className="register__input__container">
              <input
                ref={inputRefs.confirmContraseña}
                name="confirmContraseña"
                onChange={handleChange}
                value={userData.confirmContraseña}
                className={`register__form__input ${
                  inputFormError.errorConfirmContraseña
                    ? "focus: outline-2 outline outline-red-600"
                    : "focus: outline-2 outline-green-300"
                }`}
                type="password"
              />
              {userData.confirmContraseña.trim() === "" ||
              userData.contraseña.trim() !==
                userData.confirmContraseña.trim() ? (
                <p className="text-red-600 font-semibold text-sm ml-7">
                  {inputFormError.errorConfirmContraseña}
                </p>
              ) : (
                ""
              )}
              <p className="register__form__input__paragraph text-sm">
                Confirmar Contraseña
              </p>
            </div>
          </div>
          <PerfilBtn
            type="submit"
            className="register__form__btn bg-teal-300 w-6/12 h-11 rounded-3xl font-semibold text-center"
          >
            CREAR CUENTA
          </PerfilBtn>
          <div className="register__form__singin">
            <p className="register__form__paragraph text-sm">
              ¿Ya tienes cuenta?
            </p>
            <NavLink
              to="/sing-in"
              className="register__form__link text-sm text-teal-500 font-bold"
            >
              Iniciar Sesión
            </NavLink>
          </div>
        </form>
      </div>
    </section>
  );
}
