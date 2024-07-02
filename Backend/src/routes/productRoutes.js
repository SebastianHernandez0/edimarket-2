const express = require("express");
const router = express.Router();
const {upload} = require("../controllers/userController");
const {getProductos, getProductoById, agregarProducto,modifyProducto, getAllProducts}= require("../controllers/productController");
const verificarToken= require("../middlewares/verificarToken");

router.get("/", getProductos);
router.get("/:id", getProductoById)
router.post("/",upload.single('imagen'),verificarToken, agregarProducto);
router.put("/:idProducto",verificarToken, modifyProducto);
router.get("/productos/all", getAllProducts);

module.exports = router;