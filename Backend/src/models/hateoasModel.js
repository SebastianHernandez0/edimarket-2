const prepHateoas= (data) => {
    const results= data.map((item)=>{
      return {
        nombre:item.nombre,
        vendedor:item.vendedor_id,
        precio:item.precio,
        stock:item.stock,
        categoria:item.nombre_categoria,
        imagen:item.imagen,
        href:`/productos/${item.producto_id}`
      }
    })
    const total= results.length;
    const HATEOAS= {
      total,
      results
    }
    return HATEOAS;
  }

module.exports= prepHateoas;