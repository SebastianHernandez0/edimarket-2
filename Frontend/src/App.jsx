import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/home/Home.jsx";
import { SingUp } from "./pages/singUp/singUp.jsx";
import { SingIn } from "./pages/singIn/SingIn.jsx";
import { Navbar } from "./components/navbar/Navbar.jsx";
import { Footer } from "./components/footer/Footer.jsx";
import { ProductDetail } from "./pages/productDetail/ProductDetail.jsx";
import { CarritoModal } from "./components/carritoModal/CarritoModal.jsx";
import { ProductList } from "./pages/productList/ProductList.jsx";
import { Favorites } from "./pages/favorites/Favorites.jsx";
import { useContext } from "react";
import { UserContext } from "./context/UserContext.jsx";
import { MiPerfil } from "./pages/miPerfil/MiPerfil.jsx";
import { CreatePost } from "./pages/createPost/CreatePost.jsx";
import { Cart } from "./pages/cart/Cart.jsx";
import { Billing } from "./pages/billing/Billing";
import { PublishedProduct } from "./pages/publishedProduct/PublishedProduct.jsx";
import { Shipping } from "./pages/shipping/Shipping.jsx";

function App() {
  const { userToken } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <section className="app__container">
        <Routes>
          <Route path="/carro" element={<Cart />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/myProduct" element={<PublishedProduct />} />
          {/*esta ruta debe tener el nombre del producto*/}
          <Route path="shipping" element={<Shipping />} />
          <Route
            path="/"
            element={userToken ? <Home /> : <Navigate to="/sing-in" />}
            /*   element={<Home />} */
          />
          <Route path="/sing-up" element={<SingUp />} />
          <Route
            path="/sing-in"
            element={userToken ? <Navigate to="/" /> : <SingIn />}
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:categoria" element={<ProductList />} />
          <Route
            path="/favorites"
            element={userToken ? <Favorites /> : <Navigate to="/sing-in" />}
          />{" "}
          <Route
            path="/miperfil"
            element={userToken ? <MiPerfil /> : <Navigate to="/sing-in" />}
          />
          <Route
            path="/createpost"
            element={userToken ? <CreatePost /> : <Navigate to="/sing-in" />}
          />
        </Routes>
        <Footer />
        <CarritoModal />
      </section>
    </>
  );
}

export default App;
