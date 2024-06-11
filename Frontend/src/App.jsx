import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home.jsx";
import { SingUp } from "./pages/singUp/singUp.jsx";
import { SingIn } from "./pages/singIn/SingIn.jsx";
import { Navbar } from "./components/navbar/Navbar.jsx";
import { Footer } from "./components/footer/Footer.jsx";
import "./App.css";
import { Header } from "./components/header/Header.jsx";

function App() {
  return (
    <section className="app__container">
      <Navbar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sing-up" element={<SingUp />} />
        <Route path="/sing-in" element={<SingIn />} />
      </Routes>
      <Footer />
    </section>
  );
}

export default App;
