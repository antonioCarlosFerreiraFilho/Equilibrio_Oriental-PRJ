const express = require("express");
const router = express();

//path users
router.use("/api/users", require("./UserRoutes"));
//path articles
router.use("/api/articles", require("./ArticleRoutes"));

//Route primary
router.get("/", (req, res)=> {

  res.send("Equilibrio Oriental");
});

module.exports = router;