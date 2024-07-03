const exppress = require('express');
const router = exppress.Router();

const {añadirProductoCarrito,getCarrito,deleteProductoCarrito}= require("../controllers/productController");
const verificarToken= require("../middlewares/verificarToken");

router.post("/",verificarToken, añadirProductoCarrito);
router.get("/", verificarToken, getCarrito);
router.delete("/:idProducto",verificarToken, deleteProductoCarrito);


module.exports = router;