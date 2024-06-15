import "../miPerfil/miPerfil.css";
import { PiUserListLight } from "react-icons/pi";
import { MdSell } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { FaCreditCard } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

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
        <Link className="miperfil__userinfo__data miperfil__userinfo__postlink">
          <PiUserListLight className="miperfil__userinfo__icon text" />
          Información personal
        </Link>
        <Link
          to="/createpost"
          className="miperfil__userinfo__data miperfil__userinfo__postlink"
        >
          <IoAddCircle className="miperfil__userinfo__icon" />
          Crear una publicación
        </Link>
        <Link className="miperfil__userinfo__data miperfil__userinfo__postlink">
          <MdSell className="miperfil__userinfo__icon" />
          Mis publicaciones
        </Link>
        <Link className="miperfil__userinfo__data miperfil__userinfo__postlink">
          <HiMiniShoppingBag className="miperfil__userinfo__icon" />
          Mis compras
        </Link>
        <Link className="miperfil__userinfo__data miperfil__userinfo__postlink">
          <FaCreditCard className="miperfil__userinfo__icon" />
          Mis tarjetas
        </Link>
        <Link className="miperfil__userinfo__data miperfil__userinfo__postlink">
          <FaLocationDot className="miperfil__userinfo__icon" />
          Mis direcciones
        </Link>
      </div>
    </section>
  );
}
