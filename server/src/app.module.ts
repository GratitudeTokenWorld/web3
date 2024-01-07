import { join } from 'path';

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { memoryStorage } from 'multer';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';

@Module
({
    imports:
    [
        ConfigModule.forRoot(),
        MulterModule.register({ storage: memoryStorage() }),
        GraphQLModule.forRoot<ApolloDriverConfig>
        ({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            context: ({ req, res }) => ({ req, res }),
            playground: process.env.NODE_ENV === 'Development' ? { settings: { 'request.credentials': 'include' } } : false
        }),
        DatabaseModule,
        AuthModule,
        AccountModule
    ]
})
export class AppModule
{

}
