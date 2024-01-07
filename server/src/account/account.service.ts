import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';

import { Account } from '../database/types';

@Injectable()
export class AccountService
{
    private logger: Logger = new Logger(AccountService.name);

    constructor(@Inject('AUTH_DATABASE') private authDatabase: Pool)
    { }

    public async getCurrentAccount(accountId: number)
    {
        try
        {
            const accountQueryResult = await this.authDatabase.query<Account>('SELECT id, first_name, last_name, email, phone_number, verified, created_at, updated_at FROM account WHERE id = $1', [accountId]);
            return { statusCode: HttpStatus.OK, neuronData: accountQueryResult.rows[0] };
        }
        catch (exception)
        {
            this.logger.error(exception);
            throw exception;
        }
    }
}
