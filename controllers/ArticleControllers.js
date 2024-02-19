const User = require("../models/User");
const Article = require("../models/Article");

//new Article
const postArticle = async (req, res) => {
  const { title, price, company } = req.body;

  const image = req.file.filename;

  const newArticle = await Article.create({
    image,
    title,
    price,
    company,
  });

  if (!newArticle) {
    return res.status(422).json({
      errors: ["erro ao postar, favor tente novamente mais tarde, obrigado."],
    });
  }

  res.status(201).json(newArticle);
};

//get Article
const getArticle = async (req, res) => {
  const { id } = req.params;

  const articleDB = await Article.findById(id);

  if (!articleDB) {
    return res.status(404).json({ error: ["Post nao encontrado."] });
  }

  res.status(200).json(articleDB);
};

//   like Article   //
const likeArticle = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    const articleLike = await Article.findById(id);

    if (articleLike.like.includes(reqUser._id)) {
      return res.status(422).json({ errors: ["post já foi curtido."] });
    }

    articleLike.like.push(reqUser._id);

    await articleLike.save();

    return res.status(200).json({
      articleId: id,
      userId: reqUser._id,
      message: "o post foi curtido",
    });
  } catch (err) {
    return res.status(404).json({ errors: ["Post não encontrado."] });
  }
};

//   comments Photo   //
const commentsArticle = async (req, res) => {
  const { id } = req.params;
  const { comments } = req.body;
  const reqUser = req.user;

  const UserCurrent = await User.findById(reqUser._id);
  const articleDB = await Article.findById(id);

  if (!articleDB) {
    return res.status(404).json({ error: ["Post nao encontrada."] });
  }

  const newComments = {
    comments,
    userName: UserCurrent.name,
    userId: UserCurrent._id,
  };

  await articleDB.comments.push(newComments);

  await articleDB.save();

  res.status(200).json({
    comments: newComments,
    message: "comentario Publicado",
  });
};

//   All Articles   //
const allArticles = async (req, res) => {
  const Allarticles = await Article.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(Allarticles);
};

module.exports = {
  postArticle,
  getArticle,
  likeArticle,
  commentsArticle,
  allArticles,
};
