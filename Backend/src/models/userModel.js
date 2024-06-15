const z = require('zod');
const bcrypt = require('bcryptjs');
const format = require('pg-format');
const db= require("../config/database");


const validarUsuario = z.object({
    nombre: z.string().min(3),
    email: z.string().email(),
    contraseña: z.string().min(8),
});
const validarUser = z.object({
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
    const {rows:users}= await db.query(consulta);
    return users
}
const consultarUsuarioById= async (id) => {
    const consulta= "SELECT * FROM usuarios WHERE id=$1"
    const {rows:users}= await db.query(consulta,[id]);
    return users.map((user)=>{
        return {
            id:user.id,
            nombre:user.nombre,
            email:user.email
        }
    })
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
    const {rows: user} = await db.query(consulta,values);
    return user;
}

const verificarUsuario= async (email,contraseña) => {
    const values= [email]
    validarUser.parse({email,contraseña});
    const consulta= "SELECT * FROM usuarios WHERE email=$1"
    const {rows}= await db.query(consulta,values);
    const user= rows[0];
    const passwordVerified= bcrypt.compareSync(contraseña,user.contraseña);
    if (!passwordVerified) throw {code:401, message: "El usuario o contraseña no coinciden"};
    return user;
}
const consultarProductos= async () => {
    const consulta= "SELECT * from productos inner join producto_categoria on productos.id=producto_categoria.producto_id inner join categorias on producto_categoria.categoria_id=categorias.id"
    const {rows:products}= await db.query(consulta);
    return products;
}

const consultarProductoById= async (id) => {
    const consulta= "SELECT * from productos WHERE id=$1"
    const {rows:products}= await db.query(consulta,[id]);
    return products[0];
}

const consultarCategorias= async () => {
    const consulta= "SELECT * FROM categorias"
    const {rows:categorias}= await db.query(consulta);
    return categorias;
}

const idCategoria= async (categoria) => {
    const values= [categoria];
    const consulta= "SELECT id FROM categorias WHERE nombre_categoria=$1"
    const {rows}= await db.query(consulta,values);
    return rows[0].id;
}


const registrarProducto = async (producto, vendedor_id) => {
    let {nombre,descripcion,precio,stock,imagen,categoria}= producto;
    validarProducto.parse(producto);
    const categoriaId= await idCategoria(categoria);
    const id= Math.floor(Math.random() * 9999999);
    const valuesCategoria= [id,categoriaId];
    const valuesProducto= [id,nombre,descripcion,precio,stock,imagen,vendedor_id];
    const consultaProducto= ("INSERT INTO productos (id,nombre,descripcion,precio,stock,imagen,vendedor_id) VALUES ($1,$2,$3,$4,$5,$6,$7)");
    const consultaCategoria= ("INSERT INTO producto_categoria (id,producto_id,categoria_id) VALUES (DEFAULT,$1,$2)");
    await db.query(consultaProducto,valuesProducto);
    await db.query(consultaCategoria,valuesCategoria);
    return console.log("Registrado");
}

module.exports = {
    consultarUsuario,
    consultarUsuarioById,
    registrarUsuario,
    consultarCategorias,
    consultarProductos,
    registrarProducto,
    verificarUsuario,
    consultarProductoById
    
}