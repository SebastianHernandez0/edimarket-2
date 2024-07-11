import "dotenv/config";
import express, { json } from "express";
const app = express();
import cors from "cors";
import userRoutes from "../Backend/src/routes/userRoutes.js";
import categoriaRoutes from "../Backend/src/routes/categoriaRoutes.js";
import productRoutes from "../Backend/src/routes/productRoutes.js";
import favoritosRoutes from "../Backend/src/routes/favoritosRoutes.js";
import carritoRoutes from "../Backend/src/routes/carritoRoutes.js";
import ventaRoutes from "../Backend/src/routes/ventaRoutes.js";
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.use(cors());
app.use(json());

app.use("/usuarios", userRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/productos", productRoutes);
app.use("/favoritos", favoritosRoutes);
app.use("/carrito", carritoRoutes);
app.use("/venta", ventaRoutes);
app.use("/preguntas", productRoutes);

app.get("*", (_, res) => {
  res.status(404).send("No encontrado");
});
