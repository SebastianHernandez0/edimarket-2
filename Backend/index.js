require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());


const {consultarUsuario,registrarUsuario} = require('./consultas/consultas');

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await consultarUsuario();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/usuarios/registro', async (req, res) => {
    try {
        const usuario= req.body
        await registrarUsuario(usuario);
        res.status(201).json({
            nombre: usuario.nombre,
            email: usuario.email,
            contraseña: usuario.contraseña
        })
    }catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



