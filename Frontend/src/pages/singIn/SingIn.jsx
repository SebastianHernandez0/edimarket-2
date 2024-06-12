import "./singIn.css";
import { NavLink } from "react-router-dom";
import { PerfilBtn } from "../../components/perfilBtn/PerfilBtn";

export function SingIn() {
  return (
    <section className="login__container shadow-md rounded-md">
      <div className="login__form__container">
        <form className="login__form">
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
              <input className="login__form__input" type="text" required />
              <p className="login__form__input__paragraph text-sm">Email</p>
            </div>
            <div className="login__input__container">
              <input className="login__form__input" type="password" required />
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
