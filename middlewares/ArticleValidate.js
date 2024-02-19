const {body} = require("express-validator");

const postArticleValidate = ()=> {

  return [

    body("title")
      .not()
      .equals()
      .withMessage("O titulo e Obrigatorio.")
      .isString()
      .withMessage("O titulo e Obrigatorio.")
      .isLength({min: 4})
      .withMessage("O titulo deve conter no minimo 4 caracteres."),
      body("price")
      .not()
      .equals()
      .withMessage("O preço e Obrigatorio.")
      .isString()
      .withMessage("O preço e Obrigatorio.")
      .isLength({min: 4})
      .withMessage("O preço deve conter no minimo 4 digitos."),
    body("image")
      .custom((value, {req})=> {

        if(!req.file) {

          throw new Error("A imagem e obrigatoria.")
        }

        return true
      })  
  ];
};

const commentsArticleValidade = ()=> {

  return [

    body("comments")
      .isString()
      .withMessage("o comentario e obrigatorio")
  ];
};

module.exports = {

  postArticleValidate,
  commentsArticleValidade,
}