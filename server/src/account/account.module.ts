import { Module } from '@nestjs/common';

import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';

import { DatabaseModule } from '../database/database.module';

@Module
({
    imports: [DatabaseModule],
    providers: [AccountResolver, AccountService]
})
export class AccountModule
{
}
