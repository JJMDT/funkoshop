const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authController");
const { validateInput } = require("../middlewares/validator");
const { body } = require("express-validator");

// validacion dpara el formulario de inicio de sesion.
//  (**** se podria poner como un middleware de validacion y exportarlo ? ****)

const loginValidation = [
  body("email").isEmail().withMessage(" Por favor ingrese un correo valido."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("la contraseña debe tener 6 caracteres como minimo"),
];
// authRoutes
router.get("/login", authControllers.login);
router.post("/login", loginValidation, validateInput, authControllers.doLogin);
router.get("/register", authControllers.register);
router.post("/register", authControllers.doRegister);
router.get("/logout", authControllers.logout);

module.exports = router;
