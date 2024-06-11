import { NavLink } from "react-router-dom";
import { PerfilBtn } from "../../components/perfilBtn/PerfilBtn";
import "./singUp.css";

export function SingUp() {
  return (
    <section className="register__container shadow-md rounded-md">
      <div className="register__form__container">
        <form className="register__form">
          <div className="register__form__title__container">
            <h1 className="register__form__title text-center text-2xl font-medium">
              Bienvenid@s a EdiMarket
            </h1>
            <p className="register__form__paragraph text-center text-sm my-2">
              Por favor ingresa tus datos para crear tu cuenta
            </p>
          </div>
          <div className="register__form__input__container">
            <div className="register__input__container">
              <input className="register__form__input" type="text" required />
              <p className="register__form__input__paragraph text-sm">Email</p>
            </div>
            <div className="register__input__container">
              <input
                className="register__form__input"
                type="password"
                required
              />
              <p className="register__form__input__paragraph text-sm">
                Contraseña
              </p>
            </div>
            <div className="register__input__container">
              <input
                className="register__form__input"
                type="password"
                required
              />
              <p className="register__form__input__paragraph text-sm">
                Confirmar Contraseña
              </p>
            </div>
          </div>
          <PerfilBtn className="register__form__btn bg-teal-300 w-6/12 h-11 rounded-3xl font-semibold text-center">
            CREAR CUENTA
          </PerfilBtn>
          <div className="register__form__singin">
            <p className="register__form__paragraph text-sm">
              ¿Ya tienes cuenta?
            </p>
            <NavLink className="register__form__link text-sm text-teal-500 font-bold">
              Iniciar Sesión
            </NavLink>
          </div>
        </form>
      </div>
    </section>
  );
}
