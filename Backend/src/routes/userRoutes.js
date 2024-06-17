const express = require("express");
const router = express.Router();

const {getAllUsers,getUserById, registrarUser,loginUser,agregarDomicilio, consultarDomicilio}= require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/registro", registrarUser)
router.post("/login", loginUser)
router.post("/domicilio", agregarDomicilio)
router.get("/usuario/domicilio", consultarDomicilio)


module.exports = router;