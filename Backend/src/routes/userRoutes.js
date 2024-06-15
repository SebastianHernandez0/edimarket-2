const express = require("express");
const router = express.Router();

const {getAllUsers,getUserById, registrarUser,loginUser}= require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/registro", registrarUser)
router.post("/login", loginUser)

module.exports = router;