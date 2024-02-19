const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaUser = new Schema(
  {
    name: String,
    email: String,
    password: String,
    banned: Boolean,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", SchemaUser);

module.exports = User;
