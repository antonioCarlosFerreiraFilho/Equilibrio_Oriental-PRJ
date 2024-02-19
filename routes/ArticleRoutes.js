const express = require("express");
const router = express.Router();

//middlewares
const ErrorsValidate = require("../middlewares/ErrorsValidate");
const AuthGuard = require("../middlewares/AuthGuard");
const UploadImage = require("../middlewares/UploadImage");
const {postArticleValidate, commentsArticleValidade} = require("../middlewares/ArticleValidate");
//controllers
const {postArticle, getArticle, likeArticle, commentsArticle, allArticles} = require("../controllers/ArticleControllers");

router.post("/newArticle", AuthGuard, UploadImage.single("image"), postArticleValidate(), ErrorsValidate, postArticle);
router.get("/", allArticles);
router.get("/getarticle/:id", AuthGuard, getArticle);
router.put("/likeArticle/:id", AuthGuard, likeArticle);
router.put("/commentarticle/:id", AuthGuard, commentsArticleValidade(), ErrorsValidate, commentsArticle);

module.exports = router;