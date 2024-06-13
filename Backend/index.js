require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

const {
  consultarUsuario,
  registrarUsuario,
  verificarUsuario,
  consultarProductos,
  consultarCategorias,
  registrarProducto,
} = require("./consultas/consultas");

app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await consultarUsuario();
    res.send(usuarios);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/usuarios/registro", async (req, res) => {
  try {
    const usuario = req.body;
    await registrarUsuario(usuario);
    res.status(201).json({
      nombre: usuario.nombre,
      email: usuario.email,
      contraseña: usuario.contraseña,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/usuarios/login", async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const user = await verificarUsuario(email, contraseña);
    const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET);
    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get("/categorias", async (req, res) => {
  try {
    const categorias = await consultarCategorias();
    res.send(categorias);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/productos", async (req, res) => {
  try {
    const productos = await consultarProductos();
    res.send(productos);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/productos", async (req, res) => {
  try {
    const producto = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    const { email,id } = jwt.decode(token);
    await registrarProducto(producto, id);
    console.log(`El usuario ${email} con el id ${id} ha registrado un producto`);
    res.status(201).json({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      imagen: producto.imagen,
      categoria: producto.categoria,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
