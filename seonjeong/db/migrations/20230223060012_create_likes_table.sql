-- migrate:up
CREATE TABLE likes (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id int NOT NULL,
  post_id int NOT NULL,
  CONSTRAINT user_posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT post_users_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id)
);
-- migrate:down
DROP TABLE likes;
