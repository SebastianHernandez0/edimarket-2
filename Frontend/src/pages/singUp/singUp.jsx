import "./singUp.css";
import { NavLink } from "react-router-dom";
import { PerfilBtn } from "../../components/perfilBtn/PerfilBtn";
import { useEffect, useRef, useState } from "react";

export function SingUp() {
  const [singUpSuccess, setSingUpSuccess] = useState("");
  const [singUpError, setSingUpError] = useState({
    errorNombre: "",
    errorRut: "",
    errorTelefono: "",
    errorEmail: "",
    errorContraseña: "",
    errorConfirmContraseña: "",
  });
  const [userData, setUserData] = useState({
    nombre: "",
    rut: "",
    telefono: "",
    email: "",
    contraseña: "",
    confirmContraseña: "",
  });
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const rutFormatRegex = /^[0-9]+-[0-9]$/;
  const onlyNumbersRegex = /^[0-9]+$/;
  const inputRef = useRef(null);

  const handleSingupSubmit = (e) => {
    e.preventDefault();

    if (userData.nombre.trim() === "") {
      setSingUpError((prevErrors) => ({
        ...prevErrors,
        errorNombre: "Ingresa tu nombre.",
      }));
    } else if (userData.nombre.trim().length < 10) {
      setSingUpError((prevErrors) => ({
        ...prevErrors,
        errorNombre: "Ingresa tu nombre completo.",
      }));
    } else if (userData.rut.trim() === "") {
      setSingUpError((prevErrors) => ({
        ...prevErrors,
        errorRut: "Ingresa tu RUT.",
      }));
    } else if (!rutFormatRegex.test(userData.rut.trim())) {
      setSingUpError((prevErrors) => ({
        ...prevErrors,
        errorRut: "Ingresa un RUT válido.",
      }));
    } else if (userData.telefono.trim() === "") {
      setSingUpError((prevErrors) => ({
        ...prevErrors,
        errorTelefono: "Ingresa tu teléfono.",
      }));
    } else if (!onlyNumbersRegex.test(userData.telefono.trim())) {
      setSingUpError((prevErrors) => ({
        ...prevErrors,
        errorTelefono: "Ingresa solo números.",
      }));
    } else if (userData.email.trim() === "") {
      setSingUpError((prevErrors) => ({
        ...prevErrors,
        errorEmail: "Ingresa tu correo electrónico.",
      }));
    } else if (!emailRegex.test(userData.email.trim())) {
      setSingUpError((prevErrors) => ({
        ...prevErrors,
        errorEmail: "Ingresa un correo electrónico válido.",
      }));
    } else if (userData.contraseña.trim() === "") {
      setSingUpError((prevErrors) => ({
        ...prevErrors,
        errorContraseña: "Ingresa tu contraseña.",
      }));
    } else if (userData.confirmContraseña.trim() === "") {
      setSingUpError((prevErrors) => ({
        ...prevErrors,
        errorConfirmContraseña: "Confirma tu contraseña.",
      }));
    } else if (
      userData.contraseña.trim() !== userData.confirmContraseña.trim()
    ) {
      setSingUpError((prevErrors) => ({
        ...prevErrors,
        errorConfirmContraseña: "Las contraseñas no coinciden.",
      }));
    } else {
      setSingUpSuccess("!Te has registrado con éxito!.");
      setSingUpError({
        errorNombre: "",
        errorRut: "",
        errorTelefono: "",
        errorEmail: "",
        errorContraseña: "",
        errorConfirmContraseña: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
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
                ref={inputRef}
                name="nombre"
                onChange={handleChange}
                value={userData.nombre}
                className="register__form__input"
                type="text"
              />
              {userData.nombre.trim() === "" ||
              userData.nombre.trim().length < 10 ? (
                <p className="text-red-600 font-semibold text-sm ml-7">
                  {singUpError.errorNombre}
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
                ref={inputRef}
                name="rut"
                onChange={handleChange}
                value={userData.rut}
                className="register__form__input"
                type="text"
              />
              {userData.rut.trim() === "" ||
              !rutFormatRegex.test(userData.rut.trim()) ? (
                <p className="text-red-600 font-semibold text-sm ml-7">
                  {singUpError.errorRut}
                </p>
              ) : (
                ""
              )}
              <p className="register__form__input__paragraph text-sm">Rut</p>
            </div>
            <div className="register__input__container">
              <input
                name="telefono"
                onChange={handleChange}
                value={userData.telefono}
                className="register__form__input"
                type="text"
              />
              {userData.telefono.trim() === "" ||
              !onlyNumbersRegex.test(userData.telefono.trim()) ? (
                <p className="text-red-600 font-semibold text-sm ml-7">
                  {singUpError.errorTelefono}
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
                name="email"
                onChange={handleChange}
                value={userData.email}
                className="register__form__input"
                type="text"
              />
              {userData.email.trim() === "" ||
              !emailRegex.test(userData.email.trim()) ? (
                <p className="text-red-600 font-semibold text-sm ml-7">
                  {singUpError.errorEmail}
                </p>
              ) : (
                ""
              )}
              <p className="register__form__input__paragraph text-sm">Email</p>
            </div>
            <div className="register__input__container">
              <input
                name="contraseña"
                onChange={handleChange}
                value={userData.contraseña}
                className="register__form__input"
                type="password"
              />
              {userData.contraseña.trim() === "" ? (
                <p className="text-red-600 font-semibold text-sm ml-7">
                  {singUpError.errorContraseña}
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
                name="confirmContraseña"
                onChange={handleChange}
                value={userData.confirmContraseña}
                className="register__form__input"
                type="password"
              />
              {userData.confirmContraseña.trim() === "" ||
              userData.contraseña.trim() !==
                userData.confirmContraseña.trim() ? (
                <p className="text-red-600 font-semibold text-sm ml-7">
                  {singUpError.errorConfirmContraseña}
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
