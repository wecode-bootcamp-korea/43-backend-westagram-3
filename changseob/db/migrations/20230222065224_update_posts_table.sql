-- migrate:up
ALTER TABLE posts ADD image_url VARCHAR(2000) NULL;
ALTER TABLE posts MODIFY image_url VARCHAR(2000) NULL AFTER content;
-- migrate:down