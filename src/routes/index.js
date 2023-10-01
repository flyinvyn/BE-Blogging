const express = require("express");
const router = express.Router();
const usersRouter = require("../routes/users");
const articlesRouter = require("../routes/articles");

router.use("/users", usersRouter);
router.use("/articles", articlesRouter);
module.exports = router;
