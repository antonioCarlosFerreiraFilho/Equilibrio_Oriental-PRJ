const mongoose = require("mongoose");
const userDB = process.env.USERDB;
const passDB = process.env.PASSDB;

const connectDB = async () => {
  try {
    const keyDB = mongoose.connect(`mongodb+srv://${userDB}:${passDB}@cluster0.tjiaprr.mongodb.net/?retryWrites=true&w=majority`);
    console.log("DB connected");
    return keyDB;
  } catch (err) {
    console.log("error when connecting MongoDB.... ");
  }
};

connectDB();

module.exports = connectDB;
