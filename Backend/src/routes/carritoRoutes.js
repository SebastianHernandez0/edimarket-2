const exppress = require('express');
const router = exppress.Router();

const {añadirProductoCarrito}= require("../controllers/productController");
const verificarToken= require("../middlewares/verificarToken");

router.post("/",verificarToken, añadirProductoCarrito);

module.exports = router;