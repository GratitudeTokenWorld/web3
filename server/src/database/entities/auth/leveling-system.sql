CREATE TABLE leveling_system
(
    id                  SERIAL PRIMARY KEY,
    account_id          INTEGER REFERENCES account(id) ON DELETE CASCADE,
    current_level       INTEGER,
    experience_points   INTEGER
);
