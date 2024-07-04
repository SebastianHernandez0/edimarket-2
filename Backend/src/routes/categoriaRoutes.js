import { Router } from "express";
const router = Router();

import { userController } from "../controllers/userController.js";
import { productController } from "../controllers/productController.js";

router.get("/", userController.consultarCategoria);
router.get("/:categoria", productController.getProductosByCategoria);

export default router;
