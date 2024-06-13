const {Pool} = require('pg');
const format = require('pg-format');
const z = require('zod');
const bcrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');


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

const validarProducto = z.object({
    nombre: z.string().min(3),
    descripcion: z.string().min(0),
    precio: z.number().min(0),
    stock: z.number().min(0),
    imagen: z.string().min(3),
    categoria: z.string().min(3),
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

const consultarProductos= async () => {
    const consulta= "SELECT * from productos inner join producto_categoria on productos.id=producto_categoria.producto_id inner join categorias on producto_categoria.categoria_id=categorias.id"
    const {rows:products}= await pool.query(consulta);
    return products;
}

const consultarCategorias= async () => {
    const consulta= "SELECT * FROM categorias"
    const {rows:categorias}= await pool.query(consulta);
    return categorias;
}

const idCategoria= async (categoria) => {
    const values= [categoria];
    const consulta= "SELECT id FROM categorias WHERE nombre_categoria=$1"
    const {rows}= await pool.query(consulta,values);
    return rows[0].id;
}


const registrarProducto = async (producto) => {
    let {nombre,descripcion,precio,stock,imagen,vendedor_id,categoria}= producto;
    validarProducto.parse(producto);
    const categoriaId= await idCategoria(categoria);
    const id= Math.floor(Math.random() * 9999999);
    const valuesCategoria= [id,categoriaId];
    const valuesProducto= [id,nombre,descripcion,precio,stock,imagen,vendedor_id];
    const consultaProducto= ("INSERT INTO productos (id,nombre,descripcion,precio,stock,imagen,vendedor_id) VALUES ($1,$2,$3,$4,$5,$6,$7)");
    const consultaCategoria= ("INSERT INTO producto_categoria (id,producto_id,categoria_id) VALUES (DEFAULT,$1,$2)");
    await pool.query(consultaProducto,valuesProducto);
    await pool.query(consultaCategoria,valuesCategoria);
    return console.log("Registrado");
}

module.exports = {
    consultarUsuario,
    registrarUsuario,
    consultarCategorias,
    consultarProductos,
    registrarProducto
    
}