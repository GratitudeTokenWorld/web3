declare namespace NodeJS
{
    interface ProcessEnv
    {
        // General
        NODE_ENV: 'Development' | 'Production';
        PORT: string;

        // URI
        CLIENT_IP_OR_URL: string;

        // Auth Database
        AUTH_DATABASE_HOST: string;
        AUTH_DATABASE_PORT: string;
        AUTH_DATABASE_NAME: string;
        AUTH_DATABASE_USERNAME: string;
        AUTH_DATABASE_PASSWORD: string;

        // Web Database
        WEB_DATABASE_HOST: string;
        WEB_DATABASE_PORT: string;
        WEB_DATABASE_NAME: string;
        WEB_DATABASE_USERNAME: string;
        WEB_DATABASE_PASSWORD: string;

        // Json Web Token
        JWT_ACCESS_KEY: string;
        JWT_REFRESH_KEY: string;
        JWT_ACCESS_EXPIRES_IN: string;
        JWT_REFRESH_EXPIRES_IN: string;
        JWT_ACCESS_COOKIE_MAX_AGE: string;
        JWT_REFRESH_COOKIE_MAX_AGE: string;

        // Mail
        MAIL_SERVICE: string;
        MAIL_HOST: string;
        MAIL_PORT: string;
        MAIL_USERNAME: string;
        MAIL_PASSWORD: string;
        MAIL_FROM: string;
    }
}
