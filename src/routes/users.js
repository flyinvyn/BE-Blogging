const express = require("express");
const router = express.Router();
const uploadUsers = require("../middlewares/uploadUsers");
const usersController = require("../controller/users");
router
  .post("/register", usersController.registerUsers)
  .post("/login", usersController.loginUsers)
  .get("/:id", usersController.getSelectUsers)
  .get("/", usersController.getAllUsers)
  .put("/:id", uploadUsers, usersController.updateUsers)
  .delete("/:id", usersController.deleteUsers);
module.exports = router;
