import { useContext } from "react";
import "../categories/categories.css";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

export function Categories() {
  const { openCategories } = useContext(ProductContext);

  return (
    <section className="categories__container">
      {openCategories ? (
        <div className="categories__list bg-gray-50 shadow-md ">
          <Link className="categories__list__link" to="/category/consolas">
            <div>
              <h4>Consolas</h4>
            </div>
          </Link>
          <Link className="categories__list__link" to="/category/accesorios">
            <div>
              <h4>Accesorios</h4>
            </div>
          </Link>
          <Link className="categories__list__link" to="/category/monitores">
            <div>
              <h4>Monitores</h4>
            </div>
          </Link>
          <Link className="categories__list__link" to="/category/componentes">
            <div>
              <h4>Componentes</h4>
            </div>
          </Link>
          <Link className="categories__list__link" to="/category/telefonia">
            <div>
              <h4>Telefonía</h4>
            </div>
          </Link>
          <Link
            className="categories__list__link"
            to="/category/electrodomesticos"
          >
            <div>
              <h4>Electrodomésticos</h4>
            </div>
          </Link>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
