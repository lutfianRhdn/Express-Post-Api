const express = require("express");
const route = express.Router();
const controller = require("../controllers/post.controller");
const middleware = require("../middlewares");
route.use(middleware.auth);
route.get("/", controller.index);
route.get("/:id", controller.detail);
route.post("/", controller.store);
route.put("/:id", controller.update);
route.delete("/:id", controller.destroy);

module.exports = route;
