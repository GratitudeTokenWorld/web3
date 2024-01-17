CREATE TABLE account
(
    id                      SERIAL PRIMARY KEY,
    username                VARCHAR(255) NOT NULL,
    email                   VARCHAR(255) NOT NULL,
    referred_by_account_id  INTEGER REFERENCES account(id) DEFAULT NULL,
    created_at              TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at              TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
