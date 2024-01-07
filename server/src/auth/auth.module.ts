import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

import { DatabaseModule } from '../database/database.module';

@Module
({
    imports: [DatabaseModule],
    providers: [AuthResolver, AuthService]
})
export class AuthModule
{}
