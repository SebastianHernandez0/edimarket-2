import { useContext } from "react";
import "../categories/categories.css";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

export function Categories() {
  const { openCategories } = useContext(ProductContext);

  return (
    <section className="categories__container">
      {openCategories ? (
        <div className="categories__list bg-gray-200 shadow-md ">
          <Link className="categories__list__link" to="/category/consolas">
            <div>
              <h3>Consolas</h3>
            </div>
          </Link>
          <Link className="categories__list__link" to="/category/accesorios">
            <div>
              <h3>Accesorios</h3>
            </div>
          </Link>
          <Link className="categories__list__link" to="/category/monitores">
            <div>
              <h3>Monitores</h3>
            </div>
          </Link>
          <Link className="categories__list__link" to="/category/componentes">
            <div>
              <h3>Componentes</h3>
            </div>
          </Link>
          <Link className="categories__list__link" to="/category/telefonia">
            <div>
              <h3>Telefonía</h3>
            </div>
          </Link>
          <Link
            className="categories__list__link"
            to="/category/electrodomesticos"
          >
            <div>
              <h3>Electrodomésticos</h3>
            </div>
          </Link>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
