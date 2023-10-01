-- CREATE DATABASE
CREATE DATABASE blogging;

-- TABLE USERS
CREATE TABLE users
(
    users_id VARCHAR NOT NULL PRIMARY KEY,
    users_name VARCHAR(255),
    users_email VARCHAR(255),
    users_phone VARCHAR(255),
    users_password VARCHAR(255),
    users_confirmpassword VARCHAR(255),
    users_photo VARCHAR(255)
);

CREATE TABLE articles
(
    articles_id VARCHAR NOT NULL PRIMARY KEY,
    articles_title VARCHAR,
    articles_writer VARCHAR,
    articles_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    articles_content TEXT,
    articles_photo VARCHAR,
    users_id VARCHAR,
    Foreign Key (users_id) REFERENCES users(users_id)
);

SELECT articles.*,users.users_name,users.users_photo FROM articles JOIN users ON articles.users_id = users.users_id