const {consultarProductos, consultarProductoById, registrarProducto,agregarCarrito, consultarProductosByCategoria}= require("../models/userModel");
const prepHateoas= require("../models/hateoasModel");
const jwt = require("jsonwebtoken");

const getProductos= async (req, res) => {
    try {
        const productos = await consultarProductos();
        const hateoas=await prepHateoas(productos);
        res.send(hateoas);
      } catch (error) {
        res.status(500).json({error: error.message});
      }
}

const getProductoById= async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await consultarProductoById(id);
        res.send(producto);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const agregarProducto = async (req, res) => {
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
          estado: producto.estado,
          precio: producto.precio,
          stock: producto.stock,
          imagen: producto.imagen,
          categoria: producto.categoria,
        });
      } catch (error) {
        res.status(500).json({error: error.message});
      } 
}

const getProductosByCategoria = async (req, res) => {
    try {
        const {categoria} = req.params;
        const productos = await consultarProductosByCategoria(categoria);
        const hateoas=await prepHateoas(productos);
        res.send(hateoas);
      } catch (error) {
        res.status(500).json({error: error.message});
      }
}

const añadirProductoCarrito = async (req, res) => {
    try {
        const producto = req.body;
        const Authorization = req.header("Authorization");
        const token = Authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.JWT_SECRET);
        const { email,id } = jwt.decode(token);
        await agregarCarrito(id, producto);
        console.log(`El usuario ${email} con el id ${id} ha agregado un producto al carrito`);
        res.status(201).json({Mensaje:"Producto agregado al carrito"});
      } catch (error) {
        res.status(500).json({error: error.message});
      } 
}
module.exports= {getProductos, getProductoById, agregarProducto,añadirProductoCarrito,getProductosByCategoria}