const express = require("express");
const router = express.Router();

const { consultarCategoria } = require("../controllers/userController");
const { getProductosByCategoria } = require("../controllers/productController");

router.get("/", consultarCategoria);
router.get("/:categoria", getProductosByCategoria);

module.exports = router;
