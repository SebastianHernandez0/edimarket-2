import { FaHome } from "react-icons/fa";
import "../home/home.css";

export function Home() {
  return (
    <section className="home__container">
      <div className="display: flex items-center gap-1">
        <FaHome className="home__icon text-3xl text-blue-600" />
        <h1 className="home__title font-medium text-red-600 text-3xl">
          Hola soy el home
        </h1>
      </div>
    </section>
  );
}
