const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaArticle = new Schema(
  {
    title: String,
    image: String,
    price: String,
    company: String,
    like: Array,
    comments: Array,
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", SchemaArticle);

module.exports = Article;
