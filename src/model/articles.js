const Pool = require("../config/db");

// GET ALL ARTICLES
const selectAllArticle = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`
  SELECT articles.*,users.users_name,users.users_photo FROM articles JOIN users ON articles.users_id = users.users_id
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

// SELECT ARTICLES BY ID
const selectArticleById = (articles_id) => {
  return Pool.query(`
  SELECT articles.*,users.users_name,users.users_photo FROM articles JOIN users ON articles.users_id = users.users_id
  WHERE articles.articles_id='${articles_id}'`);
};

// SELECT ARTICLES BY USERS ID
const selectArticleByUserId = (users_id) => {
  return Pool.query(`
  SELECT articles.*,users.users_name,users.users_photo FROM articles JOIN users ON articles.users_id = users.users_id
  WHERE articles.users_id='${users_id}'`);
};

// INSERT ARTICLES
const insertArticle = (data) => {
  const {
    articles_id,
    articles_title,
    articles_writer,
    articles_photo,
    articles_content,
    users_id,
  } = data;
  return Pool.query(
    `INSERT INTO articles (articles_id, articles_title, articles_writer, articles_photo, articles_content, users_id) VALUES('${articles_id}', '${articles_title}', '${articles_writer}', '${articles_photo}', '${articles_content}', '${users_id}')`
  );
};

// UPDATE ARTICLES
const updateArticle = (data) => {
  const {
    articles_id,
    articles_title,
    articles_writer,
    articles_content,
    articles_photo
  } = data;
  return Pool.query(
    `UPDATE articles SET articles_title='${articles_title}', articles_writer='${articles_writer}' ,articles_content='${articles_content}', articles_photo='${articles_photo}' WHERE articles_id='${articles_id}'`
  );
};

// const updateArticlePhoto = (data) => {
//   const {articles_id, articles_photo} = data;
//   return Pool.query(`UPDATE articles SET articles_photo='${articles_photo}' WHERE articles_id='${articles_id}'`)
// };

// DELETE ARTICLES
const deleteArticle = (articles_id) => {
  return Pool.query(`DELETE FROM articles WHERE articles_id='${articles_id}'`);
};

// const deleteArticleByUsersId = (users_id, articles_id) => {
//   return Pool.query(`DELETE FROM articles WHERE articles.users_id='${users_id}' AND articles.articles_id='${articles_id}'`);
// };
// COUNT DATA
const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM articles");
};

// FIND UUID
const findUUID = (articles_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM articles WHERE articles_id='${articles_id}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

// FIND UUID
const findUsersId = (users_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT recipes FROM recipes WHERE users_id='${users_id}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

module.exports = {
  selectArticleByUserId,
  selectAllArticle,
  selectArticleById,
  insertArticle,
  updateArticle,
  // updateArticlePhoto,
  deleteArticle,
  // deleteArticleByUsersId,
  countData,
  findUUID,
  findUsersId,
};
