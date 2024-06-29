
const prepHateoas = (data, page) => {
  page= parseInt(page);
  
  const results = data.map((item) => {
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
      fecha: item.fecha_producto,
      pagina_siguiente: `/productos?page=${page+1}`
    };
  });
  const total = results.length;
  const HATEOAS = {
    total,
    results,
  };
  return HATEOAS;
};

module.exports = prepHateoas;
