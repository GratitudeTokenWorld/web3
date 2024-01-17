CREATE TABLE avatars
(
    id          SERIAL PRIMARY KEY,
    account_id  INTEGER REFERENCES account(id) ON DELETE CASCADE,
    avatar_url  VARCHAR(255),
    is_active   BOOLEAN
);
