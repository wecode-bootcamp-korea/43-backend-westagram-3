-- migrate:up
CREATE TABLE comments(
  id  INT NOT NULL AUTO_INCREMENT,
  content vARCHAR(3000) NULL,
  user_id  INT NOT NULL,
  post_id INT NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id),
  CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)

)

-- migrate:down

DROP TABLE comments;