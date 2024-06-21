import { Link } from "react-router-dom";

export function BurgerCategories({ className }) {
  return (
    <section className={className}>
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
      <Link className="categories__list__link" to="/category/publicaciones">
        <div>
          <h3>Publicaciones</h3>
        </div>
      </Link>
      <Link className="categories__list__link" to="/category/electrodomesticos">
        <div>
          <h3>Electrodomésticos</h3>
        </div>
      </Link>
      <hr className="mt-2" />
    </section>
  );
}
