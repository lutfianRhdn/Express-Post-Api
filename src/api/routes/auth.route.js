const express = require("express");
const route = express.Router();
const controller = require("../controllers/user.controller");
const middleware = require("../middlewares");
route.post("/login", controller.login);
route.post("/register", controller.register);
route.post("/logout", middleware.auth, controller.logout);
route.get("/refresh-token", controller.refreshToken);

module.exports = route;
