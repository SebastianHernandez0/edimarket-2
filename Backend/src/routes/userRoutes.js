import { Router } from "express";
const router = Router();

import { userController } from "../controllers/userController.js";

import verificarToken from "../middlewares/verificarToken.js";

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get(
  "/usuario/productos",
  verificarToken,
  userController.consultarProductosPerUser
);
router.post("/registro", userController.registrarUser);
router.post("/login", userController.loginUser);
router.post("/domicilio", verificarToken, userController.agregarDomicilio);
router.get(
  "/usuario/domicilio",
  verificarToken,
  userController.consultarDomicilio
);
router.put("/domicilio", verificarToken, userController.modificarDomicilio);
router.post(
  "/metodosPago",
  verificarToken,
  userController.agregarPaymentMethod
);
router.get(
  "/usuario/metodosPago",
  verificarToken,
  userController.consultarPaymentMethods
);
router.delete("/", verificarToken, userController.deleteUser);
router.put("/", verificarToken, userController.ModifyUser);
router.delete(
  "/:idProducto",
  verificarToken,
  userController.deleteProductoDelUsuario
);
router.delete(
  "/usuario/metodosPago/:idMetodoDePago",
  verificarToken,
  userController.deletePaymentMethod
);
router.delete(
  "/usuario/domicilio/:idDomicilio",
  verificarToken,
  userController.deleteDomicilio
);
router.get("/usuario/ventas", verificarToken, userController.consultarVentas);

export default router;
