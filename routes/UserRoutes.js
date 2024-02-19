const express = require("express");
const router = express.Router();

//middlewares
const ErrorsValidate = require("../middlewares/ErrorsValidate");
const {registerValidate, loginValidate} = require("../middlewares/UserValidate");
const AuthGuard = require("../middlewares/AuthGuard");

//controllers
const {registerUser, loginUser, profileUser} = require("../controllers/UserControllers");

router.post("/register", registerValidate(), ErrorsValidate, registerUser);
router.post("/login", loginValidate(), ErrorsValidate, loginUser);
router.get("/profile", AuthGuard, profileUser);

module.exports = router;