
const prepHateoas = (data, page) => {
  page= parseInt(page);
  
  const results = data.map((item) => {
    fecha_producto = item.fecha_producto.toISOString().split('T')[0];
    console.log(fecha_producto);
    return {
      nombre: item.nombre,
      vendedor: item.vendedor_id,
      precio: item.precio,
      stock: item.stock,
      categoria: item.nombre_categoria,
      imagen: item.imagen,
      id: item.producto_id,
      descripcion: item.descripcion,
      estado: item.estado,
      fecha: fecha_producto
    };
  });
  const total = results.length;
  const HATEOAS = {
    total,
    siguiente_pagina: `/productos?page=${page+1}`,
    results,
  };
  return HATEOAS;
};

module.exports = prepHateoas;
