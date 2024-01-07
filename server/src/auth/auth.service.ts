import { HttpStatus, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

import { Account } from '../database/types';

import { AuthenticationInput } from './dto/authentication-input';

@Injectable()
export class AuthService
{
    private readonly logger: Logger = new Logger(AuthService.name);

    constructor(@Inject('AUTH_DATABASE') private authDatabase: Pool)
    {

    }

    public async authentication(authenticationInput: AuthenticationInput)
    {
        try
        {
            // AUTH
        }
        catch (exception)
        {
            this.logger.error(exception);
            throw exception;
        }
    }

    public async logout(request: Request, response: Response)
    {
        const refreshToken: string = request.cookies.refreshToken;
        if (!refreshToken)
            throw new UnauthorizedException({ statusCode: HttpStatus.UNAUTHORIZED, message: { field: 'result', code: 'VALIDATION_NOT_LOGGED_IN' } });

        const accountQueryResult: QueryResult<Account> = await this.authDatabase.query<Account>('SELECT id, refresh_token FROM account WHERE refresh_token = $1', [refreshToken]);
        if (accountQueryResult?.rows.length === 0)
        {
            response.clearCookie('accessToken', { httpOnly: true, sameSite: 'none', secure: true });
            response.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });

            return { statusCode: HttpStatus.OK, message: { field: 'successfully', code: 'SUCCESSFULLY_LOGOUT' } };
        }

        await this.authDatabase.query<Account>('UPDATE account SET refresh_token = NULL WHERE id = $1', [accountQueryResult.rows[0].id]);

        response.clearCookie('accessToken', { httpOnly: true, sameSite: 'none', secure: true });
        response.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });

        return { statusCode: HttpStatus.OK, message: { field: 'successfully', code: 'SUCCESSFULLY_LOGOUT' } };
    }

    public async refreshToken(request: Request, response: Response)
    {
        const refreshToken: string = request.cookies.refreshToken;
        if (!refreshToken)
            throw new UnauthorizedException({ statusCode: HttpStatus.UNAUTHORIZED, message: { field: 'result', code: 'VALIDATION_NOT_LOGGED_IN' } });

        const accountQueryResult: QueryResult<Account> = await this.authDatabase.query<Account>('SELECT id, refresh_token FROM account WHERE refresh_token = $1', [refreshToken]);
        if (accountQueryResult?.rows?.length === 0)
            throw new UnauthorizedException({ statusCode: HttpStatus.UNAUTHORIZED, message: { field: 'result', code: 'VALIDATION_NOT_LOGGED_IN' } });

        const verifyRefreshToken = verify(refreshToken, process.env.JWT_REFRESH_KEY) as any;
        if (!verifyRefreshToken || accountQueryResult?.rows[0]?.id !== verifyRefreshToken.id)
            throw new UnauthorizedException({ statusCode: HttpStatus.UNAUTHORIZED, message: { field: 'result', code: 'VALIDATION_NOT_LOGGED_IN' } });

        const accessToken: string = sign({ id: accountQueryResult.rows[0].id }, process.env.JWT_ACCESS_KEY, { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN });
        response.cookie('accessToken', accessToken, { httpOnly: true, maxAge: +process.env.JWT_ACCESS_COOKIE_MAX_AGE });

        return { statusCode: HttpStatus.OK, neuronData: { accessToken } };
    }
}
