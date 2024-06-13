const {Pool} = require('pg');
const format = require('pg-format');
const z = require('zod');
const bcrypt = require('bcryptjs');


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: "EdiMarket",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    allowExitOnIdle: true,
});

const validarUsuario = z.object({
    nombre: z.string().min(3),
    email: z.string().email(),
    contraseña: z.string().min(8),
});


const consultarUsuario= async () => {
    const consulta= "SELECT * FROM usuarios"
    const {rows:users}= await pool.query(consulta);
    return users;

}

const registrarUsuario = async (usuario) => {
    const databaseUser= await consultarUsuario();
    let {nombre,email, contraseña} = usuario;
    if (databaseUser.find(user => user.email === email)) {
        throw new Error("El usuario ya existe");
    }
    validarUsuario.parse(usuario);
    const hashedPassword= bcrypt.hashSync(contraseña)
    contraseña = hashedPassword;
    const values= [nombre, email, hashedPassword];
    const consulta= format("INSERT INTO usuarios (id,nombre, email, contraseña) VALUES (DEFAULT, $1, $2, $3)", values);
    const {rows: user} = await pool.query(consulta,values);
    return user;
}

module.exports = {
    consultarUsuario,
    registrarUsuario
}