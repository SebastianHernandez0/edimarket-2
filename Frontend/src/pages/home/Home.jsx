import "../home/home.css";
import { Products } from "../../components/products/Products.jsx";
import { Header } from "../../components/header/Header.jsx";

export function Home() {
  return (
    <div>
      <Header />
      <section className="home__container">
        <Products />
      </section>
    </div>
  );
}
