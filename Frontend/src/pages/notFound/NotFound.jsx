import { Link } from "react-router-dom";
import "../notFound/notFound.css";

export function NotFound() {
  return (
    <section className="notfound__container">
      <div className="flex items-center justify-center flex-col gap-5">
        <img
          src="/imgs/aplication/404.png"
          alt=""
          className="w-6/10 sm:w-full"
        />
        <h1 className="text-center">Ups... Parece que esta página no existe</h1>
        <Link to="/" className="font-semibold text-teal-500 text-lg">
          Volver
        </Link>
      </div>
    </section>
  );
}
