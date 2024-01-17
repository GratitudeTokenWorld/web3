CREATE TABLE profile_settings
(
    id          SERIAL PRIMARY KEY,
    account_id  INTEGER REFERENCES account(id) ON DELETE CASCADE,
    setting     VARCHAR(255),
    value       TEXT
);
