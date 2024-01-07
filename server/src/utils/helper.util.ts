import { Response } from 'express';
import { Pool } from 'pg';
import { sign } from 'jsonwebtoken';

export class HelperUtil
{
    public static async generateAndSetToken(accountId: number, response: Response, authDatabase: Pool)
    {
        const accessToken: string = sign({ id: accountId }, process.env.JWT_ACCESS_KEY, { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN });
        const refreshToken: string = sign({ id: accountId }, process.env.JWT_REFRESH_KEY, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });

        await authDatabase.query('UPDATE account SET refresh_token = $1 WHERE id = $2', [refreshToken, accountId]);

        response.cookie('accessToken', accessToken, { httpOnly: true, secure: true, maxAge: +process.env.JWT_ACCESS_COOKIE_MAX_AGE });
        response.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: +process.env.JWT_REFRESH_COOKIE_MAX_AGE });

        return { accessToken, refreshToken };
    }

    public static stringToSlug(str: string): string
    {
        if (str === '' || str === undefined || str === null)
            return;

        str = str.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();

        str = str.replace(/[^a-z0-9_\s-ءاأإآؤئبتثجحخدذرزسشصضطظعغفقكلمنهويةى]#u/, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

        return str;
    }
}
