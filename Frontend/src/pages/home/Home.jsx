import "../home/home.css";
import { Products } from "../../components/products/Products.jsx";
import { Header } from "../../components/header/Header.jsx";

export function Home() {
  return (
    <div className="home__container">
      <Header />
      <section className="">
        <Products />
      </section>
    </div>
  );
}
