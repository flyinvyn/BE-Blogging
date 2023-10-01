const express = require("express");
const router = express.Router();
const uploadArticles = require("../middlewares/uploadArticles");
const recipesController = require("../controller/articles");

router
  .get("/", recipesController.getAllArticle)
  .get("/:id", recipesController.getArticleById)
  .get("/user/:users_id", recipesController.getArticlesByUserId)
  .post("/", uploadArticles, recipesController.insertArticle)
  .put("/:id", uploadArticles, recipesController.updateArticle)
  // .put("/photo/:id", uploadArticles, recipesController.updateArticlePhoto)
  .delete("/:id", recipesController.deleteArticle)
  // .delete("/users/:users_id/:recipes_id", recipesController.deleteArticleByUsersId);


module.exports = router;
