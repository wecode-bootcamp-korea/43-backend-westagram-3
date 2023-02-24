-- migrate:up
ALTER TABLE likes DROP FOREIGN KEY likes_ibfk_2;
ALTER TABLE likes 
  ADD CONSTRAINT likes_fk_posts
  FOREIGN KEY (post_id)
  REFERENCES posts (id)
  ON DELETE CASCADE;
-- migrate:down