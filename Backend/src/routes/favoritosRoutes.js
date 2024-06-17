const express = require("express");
const router = express.Router();

const {addFavorito,consultarFavorito}= require("../controllers/userController");

router.post("/:producto_id", addFavorito)
router.get("/", consultarFavorito)

module.exports = router;