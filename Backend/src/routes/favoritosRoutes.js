const express = require("express");
const router = express.Router();

const {
  addFavorito,
  consultarFavorito,
  deleteFav,
} = require("../controllers/userController");

const verificarToken = require("../middlewares/verificarToken");

router.post("/:producto_id", verificarToken, addFavorito);
router.delete("/:idFavorito", verificarToken, deleteFav);
router.get("/", verificarToken, consultarFavorito);

module.exports = router;
