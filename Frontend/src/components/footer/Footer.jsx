import "../footer/footer.css";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer__container">
      <div className="footer__subcontainer">
        <div className="footer__logo">
          <img
            className="footer__logo__img"
            src="./imgs/aplication/logo2.png"
            alt="logo"
          />
          <p className="footer__logo__text">
            Todo lo que necesitas en un mismo lugar
          </p>
        </div>
        <div className="footer__sections flex flex-col md:flex-row content-center md:content-start justify-center md:justify-normal">
          <div className="footer__section md:basis-1/3">
            <h4 className="footer__section__title">Ayuda</h4>
            <div className="footer__section__list content-center md:content-start">
              <Link className="footer__section__link">Centro de ayuda</Link>
              <Link className="footer__section__link">
                Formulario de contacto
              </Link>
              <Link className="footer__section__link">Reclamos</Link>
            </div>
          </div>
          <div className="footer__section md:basis-1/3">
            <h4 className="footer__section__title">Nosotros</h4>
            <div className="footer__section__list content-center md:content-start">
              <Link className="footer__section__link">Quiénes somos</Link>
              <Link className="footer__section__link">Contacto</Link>
              <Link className="footer__section__link">Encuéntranos</Link>
              <Link className="footer__section__link">Tiendas</Link>
              <Link className="footer__section__link">Blogs</Link>
            </div>
          </div>
          <div className="footer__section md:basis-1/3">
            <h4 className="footer__section__title">Servicio al cliente</h4>
            <div className="footer__section__list content-center md:content-start">
              <Link className="footer__section__link">
                Términos y condiciones
              </Link>
              <Link className="footer__section__link">Promociones</Link>
              <Link className="footer__section__link">Devoluciones</Link>
              <Link className="footer__section__link">Servicios técnicos</Link>
              <Link className="footer__section__link">Asistencia de compra</Link>
            </div>
          </div>
        </div>
        <div className="footer__social">
          <h4 className="footer__social__title">Social</h4>
          <div className="footer__social__icons">
            <FaFacebookSquare className="footer__social__icon hover:text-blue-600" />
            <FaInstagram className="footer__social__icon hover:text-pink-600" />
            <FaYoutube className="footer__social__icon hover:text-red-600" />
          </div>
          <div className="footer__content">
            <span>EDIMARKET | Todos los derechos reservados | 2024</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
