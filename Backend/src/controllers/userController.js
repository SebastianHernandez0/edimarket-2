const {
    consultarUsuario,
    consultarUsuarioById,
    registrarUsuario,
    verificarUsuario,
    consultarCategorias,
    agregarDirreccion,
    consultarDirreccion,
    agregarFavorito,
    consultarProductoById,
    consultarFavoritos,
    borrarFavorito
}= require("../models/userModel");
const jwt = require("jsonwebtoken");

const getAllUsers= async (req, res) => {
    try {
        const usuarios = await consultarUsuario();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getUserById= async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await consultarUsuarioById(id);
        res.send(usuario);
    } catch (error) {
        res.status(500).send(error);
    }
}

const registrarUser= async (req, res) => {
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
}

const loginUser= async (req, res) => {
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
}

const consultarCategoria= async (req, res) => {
    try {
        const categorias = await consultarCategorias();
        res.send(categorias);
    } catch (error) {
        res.status(500).send(error);
    }
}

const agregarDomicilio= async (req, res) => {
    try {
        const domicilio = req.body;
        const Authorization = req.header("Authorization");
        const token = Authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.JWT_SECRET);
        const { email,id } = jwt.decode(token);
        await agregarDirreccion(domicilio, id);
        console.log(`El usuario ${email} con el id ${id} ha agregado un domicilio`);
        res.status(201).json({
            message: "Domcilio agregado",
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}


const consultarDomicilio= async (req, res) => {
    try {
        const Authorization = req.header("Authorization");
        const token = Authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.JWT_SECRET);
        const { email,id } = jwt.decode(token);
        const domicilio = await consultarDirreccion(id);
        console.log(`El usuario ${email} con el id ${id} ha consultado su domicilio`);
        res.json({
            Domicilio: domicilio.map((domicilio)=>{
                return {
                    direccion: domicilio.direccion,
                    numero_casa: domicilio.numero_casa,
                    ciudad: domicilio.ciudad,
                    comuna: domicilio.comuna,
                    region: domicilio.region,
                    codigo_postal: domicilio.codigo_postal,
                }
            })
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

const addFavorito= async (req, res) => {
    try {
        const {producto_id} = req.params;
        const Authorization = req.header("Authorization");
        const token = Authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.JWT_SECRET);
        const { email,id } = jwt.decode(token);
        await agregarFavorito(producto_id, id);
        const producto = await consultarProductoById(producto_id);
        console.log(`El usuario ${email} con el id ${id} ha agregado un producto a favoritos`);
        res.json({
            message: "Producto agregado",
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

const consultarFavorito= async (req, res) => {
    try {
        const Authorization = req.header("Authorization");
        const token = Authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.JWT_SECRET);
        const { email,id } = jwt.decode(token);
        const favoritos = await consultarFavoritos(id);
        console.log(`El usuario ${email} con el id ${id} ha consultado sus favoritos`);
        res.json({
            favoritos: favoritos.map((favorito)=>{
                return {
                    id: favorito.favorito_id,
                    nombre: favorito.nombre,
                    descripcion: favorito.descripcion,
                    precio: favorito.precio,
                    stock: favorito.stock,
                    imagen: favorito.imagen,
                    categoria: favorito.categoria,
                }
            })
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteFav= async (req, res) => {
    try {
        const { idFavorito } = req.params;
        const Authorization = req.header("Authorization");
        const token = Authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.JWT_SECRET);
        const { email,id } = jwt.decode(token);
        const favorito = await borrarFavorito(idFavorito,id);
        console.log(`El usuario ${email} con el id ${id} ha eliminado un favorito`);
        res.status(200).json({
            message: "Favorito eliminado",
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllUsers, getUserById,registrarUser,loginUser,consultarCategoria,agregarDomicilio,consultarDomicilio,addFavorito,consultarFavorito,deleteFav
}