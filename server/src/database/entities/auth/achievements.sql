CREATE TABLE achievements
(
    id                      SERIAL PRIMARY KEY,
    account_id              INTEGER REFERENCES account(id) ON DELETE CASCADE,
    achievement_details     TEXT
);
