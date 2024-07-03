const express= require("express")
const router = express.Router()


const {ventaRealizada}=require("../controllers/productController");
const verificarToken= require("../middlewares/verificarToken")

router.post("/",verificarToken,ventaRealizada)

module.exports = router;