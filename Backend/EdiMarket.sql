CREATE DATABASE EdiMarket;

CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	contraseña VARCHAR(255) NOT NULL);

CREATE TABLE productos(
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	descripcion text,
	precio NUMERIC(15,2) CHECK (precio >=0 ) NOT NULL,
	stock INT NOT NULL,
	imagen VARCHAR(255),
	vendedor_id INT NOT NULL,
	FOREIGN KEY (vendedor_id) REFERENCES usuarios(id)
);

CREATE TABLE categorias(
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL
	);

CREATE TABLE producto_categoria(
	id SERIAL PRIMARY KEY,
	producto_id INT NOT NULL,
	categoria_id INT NOT NULL,
	FOREIGN KEY (producto_id) REFERENCES productos(id),
	FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE favoritos(
	ID SERIAL PRIMARY KEY,
	usuario_id INT NOT NULL,
	producto_id INT NOT NULL,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
	FOREIGN KEY (producto_id) REFERENCES productos(id)
);

CREATE TABLE carrito(
	ID SERIAL PRIMARY KEY,
	usuario_id INT NOT NULL,
	producto_id INT NOT NULL,
	cantidad INT NOT NULL,
	comprado BOOLEAN NOT NULL
	);

CREATE TABLE domicilio(
	ID SERIAL PRIMARY KEY,
	usuario_id INT NOT NULL,
	direccion VARCHAR(255) NOT NULL,
	ciudad VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    codigo_postal VARCHAR(20) NOT NULL,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id));
	
CREATE TABLE ventas(
	id SERIAL PRIMARY KEY,
	comprador_id INT NOT NULL,
	producto_id INT NOT NULL,
	cantidad INT NOT NULL,
	precio NUMERIC(15,2) CHECK (precio >=0 ) NOT NULL,
	fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (comprador_id) REFERENCES usuarios(id),
	FOREIGN KEY (producto_id) REFERENCES productos(id)
	);
	
CREATE TABLE metodos_pago(
	INT SERIAL PRIMARY KEY,
	usuario_id INT NOT NULL,
	tipo_tarjeta VARCHAR(50) NOT NULL,
	numero_tarjeta VARCHAR(255) NOT NULL,
	nombre_titular VARCHAR(255) NOT NULL,
	fecha_expiracion VARCHAR(20) NOT NULL,
	codigo_seguridad VARCHAR(4) NOT NULL,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
	);
