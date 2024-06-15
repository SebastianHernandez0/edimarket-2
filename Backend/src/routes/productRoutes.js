const express = require("express");
const router = express.Router();

const {getProductos, getProductoById, agregarProducto}= require("../controllers/productController");

router.get("/", getProductos);
router.get("/:id", getProductoById)
router.post("/", agregarProducto)

module.exports = router;