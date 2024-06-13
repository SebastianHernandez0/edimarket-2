import "../categories/categories.css";
import { Link } from "react-router-dom";

export function Categories() {
  return (
    <section className="categories__container">
      <Link to="/category/consolas">
        <div>
          <h3>Consolas</h3>
        </div>
      </Link>
      <Link to="/category/accesorios">
        <div>
          <h3>Accesorios</h3>
        </div>
      </Link>
      <Link to="/category/electrodomesticos">
        <div>
          <h3>Electrodomésticos</h3>
        </div>
      </Link>
    </section>
  );
}
