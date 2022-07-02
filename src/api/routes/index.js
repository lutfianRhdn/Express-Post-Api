const express = require("express");
const route = express.Router();
route.use("/auth", require("./auth.route"));
route.use("/post", require("./post.route"));
module.exports = route;
