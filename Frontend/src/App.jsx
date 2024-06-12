import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home.jsx";
import { SingUp } from "./pages/singUp/singUp.jsx";
import { SingIn } from "./pages/singIn/SingIn.jsx";
import { Navbar } from "./components/navbar/Navbar.jsx";
import { Footer } from "./components/footer/Footer.jsx";
import { Header } from "./components/header/Header.jsx";
import { ProductDetail } from "./pages/productDetail/ProductDetail.jsx";
import { CarritoModal } from "./components/carritoModal/CarritoModal.jsx";

function App() {
  return (
    <section className="app__container">
      <Navbar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sing-up" element={<SingUp />} />
        <Route path="/sing-in" element={<SingIn />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <CarritoModal />
      <Footer />
    </section>
  );
}

export default App;
