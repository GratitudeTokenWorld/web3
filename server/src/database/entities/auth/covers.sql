CREATE TABLE covers
(
    id          SERIAL PRIMARY KEY,
    account_id  INTEGER REFERENCES account(id) ON DELETE CASCADE,
    cover_url   VARCHAR(255),
    is_active   BOOLEAN
);
