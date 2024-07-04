import { Router } from "express";
const router = Router();

import { userController } from "../controllers/userController.js";

import verificarToken from "../middlewares/verificarToken.js";

router.post("/:producto_id", verificarToken, userController.addFavorito);
router.delete("/:idFavorito", verificarToken, userController.deleteFav);
router.get("/", verificarToken, userController.consultarFavorito);

export default router;
