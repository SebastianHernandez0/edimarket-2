const express = require("express");
const router = express.Router();

const {addFavorito,consultarFavorito,deleteFav}= require("../controllers/userController");

router.post("/:producto_id", addFavorito)
router.delete("/:idFavorito", deleteFav)
router.get("/", consultarFavorito)

module.exports = router;