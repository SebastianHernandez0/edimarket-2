require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const productRoutes = require("./routes/productRoutes");
const favoritosRoutes = require("./routes/favoritosRoutes");
const carritoRoutes = require("./routes/carritoRoutes");
const ventaRoutes = require("./routes/ventaRoutes");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.use(cors());
app.use(express.json());

app.use("/usuarios", userRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/productos", productRoutes);
app.use("/favoritos", favoritosRoutes);
app.use("/carrito", carritoRoutes);
app.use("/venta", ventaRoutes);

app.get("*", (_, res) => {
  res.status(404).send("No encontrado");
});

module.exports = app;
