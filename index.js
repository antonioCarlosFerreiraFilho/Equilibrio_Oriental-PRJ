require("dotenv").config();
require("./config/db.js");

const express = require("express");
const app = express();

const PORT = process.env.PORT;
const cors = require("cors");
const path = require("path");

//config send json()
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//url Front-end
app.use(cors());

//path static images
app.use("/uploads", express.static("uploads"));

//Routes
const route = require("./routes/Router.js");
app.use(route);


app.listen(PORT, ()=> {

  console.log("http://localhost:" + PORT);
});