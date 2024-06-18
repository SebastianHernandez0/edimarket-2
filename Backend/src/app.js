require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const userRoutes= require("./routes/userRoutes");
const categoriaRoutes= require("./routes/categoriaRoutes");
const productRoutes= require("./routes/productRoutes");
const favoritosRoutes= require("./routes/favoritosRoutes");


app.use(cors());
app.use(express.json());



app.use("/usuarios", userRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/productos", productRoutes);
app.use("/favoritos", favoritosRoutes);


app.get("*", (req, res) => {
  res.status(404).send("No encontrado");
})



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
