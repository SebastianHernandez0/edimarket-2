
const prepHateoas = (data) => {
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
