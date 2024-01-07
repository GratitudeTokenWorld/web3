import { BadRequestException, CanActivate, ExecutionContext, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';
import { Pool, QueryResult } from 'pg';

import { Account } from '../database/types';

@Injectable()
export class AuthGuard implements CanActivate
{
    constructor(@Inject('AUTH_DATABASE') private authDatabase: Pool)
    {}

    async canActivate(context: ExecutionContext): Promise<boolean>
    {
        const request = GqlExecutionContext.create(context).getContext().req;

        let token: string;

        if (request.headers.authorization && request.headers.authorization.startsWith('Bearer'))
            token = request.headers.authorization.split(' ')[1];
        else
            token = request.cookies.accessToken;

        if (!token)
            throw new UnauthorizedException({ statusCode: HttpStatus.UNAUTHORIZED, message: { field: 'result', code: 'VALIDATION_NOT_LOGGED_IN' } });

        let decoded: any;

        try
        {
            decoded = verify(token, process.env.JWT_ACCESS_KEY);
        }
        catch (error)
        {
            throw new UnauthorizedException({ statusCode: HttpStatus.UNAUTHORIZED, message: { field: 'result', code: 'VALIDATION_NOT_LOGGED_IN' } });
        }

        if (!decoded)
            throw new UnauthorizedException({ statusCode: HttpStatus.UNAUTHORIZED, message: { field: 'result', code: 'VALIDATION_NOT_LOGGED_IN' } });

        const account: QueryResult<Account> = await this.authDatabase.query<Account>('SELECT id FROM account WHERE id = $1', [decoded.id]);
        if (account.rows.length === 0)
            throw new BadRequestException({ statusCode: HttpStatus.BAD_REQUEST, message: { field: 'result', code: 'VALIDATION_ACCOUNT_DOES_NOT_EXISTS' } });

        request.accountId = decoded.id;

        return true;
    }
}
