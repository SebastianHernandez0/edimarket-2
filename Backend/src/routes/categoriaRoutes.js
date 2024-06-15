const express = require("express");
const router = express.Router();

const {consultarCategoria}= require("../controllers/userController");

router.get("/", consultarCategoria);

module.exports = router;