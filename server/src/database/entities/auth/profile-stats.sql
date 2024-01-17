CREATE TABLE profile_stats
(
    id          SERIAL PRIMARY KEY,
    account_id              INTEGER REFERENCES account(id) ON DELETE CASCADE,
    account_type            VARCHAR(255),
    last_active_date        TIMESTAMPTZ,
    monthly_active_average  DECIMAL,
    yearly_active_average   DECIMAL,
    reach                   DECIMAL,
    frequency               DECIMAL,
    virality                DECIMAL,
    shareability            DECIMAL,
    engagement              DECIMAL
);
