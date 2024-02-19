const { body } = require("express-validator");

const registerValidate = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome de usuario e obrigatorio.")
      .isLength({ min: 4 })
      .withMessage("O nome de usuario deve conter no minimo 4 caracteres."),
    body("email")
      .isString()
      .withMessage("O email e obrigatorio.")
      .isEmail()
      .withMessage("Insira um Email valido."),
    body("password")
      .isString()
      .withMessage("A senha e obrigatoria.")
      .isLength({ min: 5 })
      .withMessage("A senha deve conter no minimo 5 caracteres."),
    body("confirmPassword")
      .isString()
      .withMessage("A confirmação da senha e obrigatoria.")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("As senhas devem ser iguais.");
        }

        return true;
      }),
  ];
};

const loginValidate = () => {
  return [
    body("email").isString().withMessage("O email e obrigatorio."),
    body("password").isString().withMessage("A senha e obrigatoria."),
  ];
};

module.exports = {
  registerValidate,
  loginValidate,
};
