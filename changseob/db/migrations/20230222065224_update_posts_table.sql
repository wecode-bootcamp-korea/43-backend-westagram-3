-- migrate:up
alter table posts add image_url varchar(2000) null;
alter table posts modify image_url varchar(2000) null after content;
-- migrate:down