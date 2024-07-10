import { Link } from "react-router-dom";
import "../notFound/notFound.css";

export function NotFound() {
  return (
    <section className="notfound__container">
      <header className="notfound__header">
        <figure className="notfound__img__container">
          <img
            className="notfound__header__img"
            src="/imgs/aplication/navLogo2.1.png"
            alt=""
          />
        </figure>
      </header>
      <figure className="notfound__body flex items-center justify-center flex-col gap-5">
        <img src="/imgs/aplication/404.png" alt="" className="notfound__img" />
        <h1 className="text-center">Ups... Parece que esta página no existe</h1>
        <Link to="/" className="font-semibold text-teal-500 text-lg">
          Volver
        </Link>
      </figure>
    </section>
  );
}
