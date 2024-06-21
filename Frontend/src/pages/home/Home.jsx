import "../home/home.css";
import { Products } from "../../components/products/Products.jsx";
import { Header } from "../../components/header/Header.jsx";

export function Home() {
  return (
    <section className="home__container">
      <Header />
      <Products />
    </section>
  );
}
