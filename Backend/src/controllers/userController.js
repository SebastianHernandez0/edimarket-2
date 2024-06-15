const {
    consultarUsuario,
    consultarUsuarioById,
    registrarUsuario,
    verificarUsuario,
    consultarCategorias,
}= require("../models/userModel");
const prepHateoas= require("../models/hateoasModel");

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




module.exports = {
    getAllUsers, getUserById,registrarUser,loginUser,consultarCategoria
}