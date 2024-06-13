import { useContext } from "react";
import "../categories/categories.css";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

export function Categories() {
  const { openCategories, setOpenCategories } = useContext(ProductContext);

  return (
    <section className="categories__container bg-gray-200 shadow-md">
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
      <Link to="/category/computadores">
        <div>
          <h3>computadores</h3>
        </div>
      </Link>
      <Link to="/category/ropa">
        <div>
          <h3>Ropa</h3>
        </div>
      </Link>
      <Link to="/category/telefonia">
        <div>
          <h3>Telefonía</h3>
        </div>
      </Link>
      <Link to="/category/publicaciones">
        <div>
          <h3>Publicaciones</h3>
        </div>
      </Link>
    </section>
  );
}
