const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");
const commonHelper = require("../helper/common");
const Joi = require("joi");
const cloudinary = require("../middlewares/cloudinary");
const {
  selectAllArticle,
  selectArticleById,
  selectArticleByUserId,
  insertArticle,
  updateArticle,
  // updateArticlePhoto,
  deleteArticle,
  // deleteArticleByUsersId,
  countData,
  findUUID,
} = require("../model/articles");

const recipesController = {
  getAllArticle: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "articles_created";
      const sort = req.query.sort || "DESC";
      const result = await selectAllArticle({ limit, offset, sort, sortby });
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };

      commonHelper.response(
        res,
        result.rows,
        200,
        "get data success",
        pagination
      );
    } catch (error) {
      console.log(error);
    }
  },

  getArticleById: (req, res, next) => {
    const articles_id = String(req.params.id);
    selectArticleById(articles_id)
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch((err) => res.send(err));
  },

  getArticlesByUserId: (req, res, next) => {
    const users_id = String(req.params.users_id);
    selectArticleByUserId(users_id)
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch((err) => res.send(err));
  },

  insertArticle: async (req, res) => {
    const { articles_title, articles_writer, users_id, articles_content } = req.body;
    const articles_id = uuidv4();
    let articles_photo = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      articles_photo = result.secure_url;
    }
    const schema = Joi.object().keys({
      articles_title: Joi.string().required(),
      articles_writer: Joi.string(),
      articles_content: Joi.any(),
      articles_photo: Joi.any(),
      users_id: Joi.any(),
    });
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      console.log(error);
      return res.send(error.details);
    }
    const data = {
      articles_id,
      articles_title,
      articles_writer,
      articles_photo,
      articles_content,
      users_id
    };
    insertArticle(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Create Article Success")
      )
      .catch((err) => res.send(err));
  },

  updateArticle: async (req, res) => {
    try {
      const { articles_title, articles_writer, articles_content } = req.body;
      const articles_id = String(req.params.id);
      const { rowCount } = await findUUID(articles_id);
      if (!rowCount) {
        return (createError("ID is Not Found"));
      }

      let articles_photo = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        articles_photo = result.secure_url;
      }

      const data = {
        articles_id,
        articles_title,
        articles_writer,
        articles_content,
        articles_photo
      };
      updateArticle(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Article updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  // updateArticlePhoto: async (req, res) => {
  //   try {
  //     const articles_id = String(req.params.id);
  //     const { rowCount } = await findUUID(articles_id);
  //     if (!rowCount) {
  //       return (createError("ID is Not Found"));
  //     }

  //     let articles_photo = null;
  //     if (req.file) {
  //       const result = await cloudinary.uploader.upload(req.file.path);
  //       articles_photo = result.secure_url;
  //     }

  //     const data = {
  //       articles_id,
  //       articles_photo,
  //     };
  //     updateArticlePhoto(data)
  //       .then((result) =>
  //         commonHelper.response(res, result.rows, 200, "Article photo updated")
  //       )
  //       .catch((err) => res.send(err));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  deleteArticle: async (req, res, next) => {
    try {
      const recipes_id = String(req.params.id);
      const { rowCount } = await findUUID(recipes_id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      await deleteArticle(recipes_id);
      commonHelper.response(res, {}, 200, "Article deleted");
    } catch (error) {
      next(error);
    }
  },
  // deleteArticleByUsersId: async (req, res, next) => {
  //   try {
  //     const users_id = String(req.params.users_id);
  //     const recipes_id = String(req.params.recipes_id);
  //     await deleteArticleByUsersId(users_id, recipes_id);
  //     commonHelper.response(res, {}, 200, "Recipe deleted");
  //   } catch (error) {
  //     next(error);
  //   }
  // },
};

module.exports = recipesController;
