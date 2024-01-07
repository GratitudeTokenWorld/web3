import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AccountService } from './account.service';
import { AccountType } from './account.type';
import { AccountDecorator } from './account.decorator';

import { AuthGuard } from '../auth/auth.guard';

@Resolver()
export class AccountResolver
{
    constructor(private readonly accountService: AccountService)
    {
    }

    @Query(() => AccountType)
    @UseGuards(AuthGuard)
    public async getCurrentAccount(@AccountDecorator() accountID: number)
    {
        return this.accountService.getCurrentAccount(accountID);
    }
}
