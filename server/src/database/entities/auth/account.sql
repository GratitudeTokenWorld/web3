CREATE TABLE account
(
    id            SERIAL PRIMARY KEY,
    first_name    VARCHAR(255),
    last_name     VARCHAR(255),
    email         VARCHAR(255) CONSTRAINT account_email_pk UNIQUE,
    phone_number  VARCHAR(30) DEFAULT NULL CONSTRAINT account_phone_number_pk UNIQUE,
    password      VARCHAR(255),
    verified      BOOLEAN DEFAULT false,
    refresh_token VARCHAR(255),
    created_at    TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
