import "./singIn.css";
import { NavLink } from "react-router-dom";
import { PerfilBtn } from "../../components/perfilBtn/PerfilBtn";
import { useState, useEffect } from "react";

export function SingIn() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const [singInSuccess, setSingInSuccess] = useState("");
  const [singInError, setSingInError] = useState({
    errorEmail: "",
    errorContraseña: "",
  });

  const [userData, setUserData] = useState({
    email: "",
    contraseña: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSingInSubmit = (e) => {
    e.preventDefault();

    if (userData.email.trim() === "") {
      setSingInError((prevErrors) => ({
        ...prevErrors,
        errorEmail: "Ingresa tu correo electrónico.",
      }));
    } else if (!emailRegex.test(userData.email.trim())) {
      setSingInError((prevErrors) => ({
        ...prevErrors,
        errorEmail: "Ingresa un correo electrónico válido.",
      }));
    } else if (userData.contraseña.trim() === "") {
      setSingInError((prevErrors) => ({
        ...prevErrors,
        errorContraseña: "Ingresa tu contraseña.",
      }));
    } else {
      setSingInSuccess("!Has iniciado sesión con éxito!.");
      setSingInError({
        errorEmail: "",
        errorContraseña: "",
      });
    }
  };

  useEffect(() => {
    if (userData.email !== "" || userData.contraseña !== "") {
      setSingInError({
        errorEmail: "",
        errorContraseña: "",
      });
    }
  }, [userData]);

  return (
    <section className="login__container shadow-md rounded-md">
      <div className="login__form__container">
        <form onSubmit={handleSingInSubmit} className="login__form">
          <div className="login__form__title__container">
            <h1 className="login__form__title text-center text-2xl font-medium">
              Bienvenid@s a EdiMarket
            </h1>
            <p className="login__form__paragraph text-center text-sm my-2">
              Por favor ingresa tus datos para entrar
            </p>
          </div>
          <div className="login__form__input__container">
            <div className="login__input__container">
              <input
                name="email"
                onChange={handleChange}
                value={userData.email}
                className={`login__form__input ${
                  singInError.errorEmail
                    ? "outline-2 outline outline-red-600"
                    : ""
                }`}
                type="text"
              />
              {userData.email.trim() === "" ||
              !emailRegex.test(userData.email.trim()) ? (
                <p className="text-red-600 font-semibold text-sm ml-7">
                  {singInError.errorEmail}
                </p>
              ) : (
                ""
              )}
              <p className="login__form__input__paragraph text-sm">Email</p>
            </div>
            <div className="login__input__container">
              <input
                name="contraseña"
                onChange={handleChange}
                value={userData.contraseña}
                className={`login__form__input ${
                  singInError.errorContraseña
                    ? "outline-2 outline outline-red-600"
                    : ""
                }`}
                type="password"
              />
              {userData.contraseña.trim() === "" ? (
                <p className="text-red-600 font-semibold text-sm ml-7">
                  {singInError.errorContraseña}
                </p>
              ) : (
                ""
              )}
              <p className="login__form__input__paragraph text-sm">
                Contraseña
              </p>
            </div>
          </div>
          <PerfilBtn className="login__form__btn bg-teal-300 w-6/12 h-11 rounded-3xl font-semibold text-center">
            INICIAR SESIÓN
          </PerfilBtn>
          <div className="login__form__singin">
            <p className="login__form__paragraph text-sm">¿No tienes cuenta?</p>
            <NavLink
              to="/sing-up"
              className="login__form__link text-sm text-teal-500 font-bold"
            >
              Crear una cuenta
            </NavLink>
          </div>
        </form>
      </div>
    </section>
  );
}
