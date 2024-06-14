import "../miPerfil/miPerfil.css";
import { PiUserListLight } from "react-icons/pi";
import { MdSell } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";

export function MiPerfil() {
  return (
    <section className="miperfil__container ">
      <div className="miperfil__userinfo__container bg-white shadow-sm ">
        <div className="miperfill__userinfo__initials">
          <h1 className="text-6xl rounded-full">EV</h1>
        </div>
        <div className="miperfil__userinfo__name">
          <p className="miperfill__userinfo__paragraph font-medium">
            Edison Alejandro Venegas Espinoza
          </p>
          <p className="miperfill__userinfo__paragraph text-sm mt-3">
            Aalevenegass@gmail.com
          </p>
        </div>
      </div>
      <div className="miperfil__userinfo__edit bg-white shadow-sm rounded-md">
        <div className="miperfil__userinfo__data">
          <PiUserListLight className="miperfil__userinfo__icon text" />
          <p>Información personal</p>
        </div>
        <div className="miperfil__userinfo__data">
          <IoAddCircle className="miperfil__userinfo__icon" />
          <p>Crear una publicación</p>
        </div>
        <div className="miperfil__userinfo__data">
          <MdSell className="miperfil__userinfo__icon" />
          <p>Mis publicaciones</p>
        </div>
      </div>
    </section>
  );
}
