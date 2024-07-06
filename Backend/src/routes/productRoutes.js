import { Router } from "express";
const router = Router();
import { productController } from "../controllers/productController.js";
import verificarToken from "../middlewares/verificarToken.js";

router.get("/", productController.getProductos);
router.get("/:id", productController.getProductoById);
router.post("/", verificarToken, productController.agregarProducto);
router.put("/:idProducto", verificarToken, productController.modifyProducto);
router.get("/productos/all", productController.getAllProducts);
router.post("/preguntas", verificarToken, productController.preguntaRealizada);

export default router;
