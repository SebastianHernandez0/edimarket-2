const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  registrarUser,
  loginUser,
  agregarDomicilio,
  consultarDomicilio,
  agregarPaymentMethod,
  consultarPaymentMethods,
  deleteUser,
  ModifyUser,
  consultarProductosPerUser,
  modificarDomicilio,
  deleteProductoDelUsuario,
  deletePaymentMethod
} = require("../controllers/userController");

const verificarToken= require("../middlewares/verificarToken");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/usuario/productos", verificarToken, consultarProductosPerUser);
router.post("/registro", registrarUser);
router.post("/login", loginUser);
router.post("/domicilio", verificarToken, agregarDomicilio);
router.get("/usuario/domicilio", verificarToken, consultarDomicilio);
router.put("/domicilio", verificarToken, modificarDomicilio);
router.post("/metodosPago",verificarToken, agregarPaymentMethod);
router.get("/usuario/metodosPago",verificarToken, consultarPaymentMethods);
router.delete("/",verificarToken, deleteUser);
router.put("/",verificarToken, ModifyUser);
router.delete("/:idProducto",verificarToken, deleteProductoDelUsuario);
router.delete("/usuario/metodosPago/:idMetodoDePago",verificarToken, deletePaymentMethod);

module.exports = router;
