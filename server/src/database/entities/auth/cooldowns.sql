CREATE TABLE cooldowns
(
    id                          SERIAL PRIMARY KEY,
    account_id                  INTEGER REFERENCES account(id) ON DELETE CASCADE,
    action                      VARCHAR(255),
    last_action_time            TIMESTAMPTZ,
    cooldown_reset_token_used   BOOLEAN
);
