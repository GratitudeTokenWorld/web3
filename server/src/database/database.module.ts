import { Module, Logger } from '@nestjs/common';
import { Pool, PoolConfig } from 'pg';

@Module
({
    providers:
    [
        {
            provide: 'AUTH_DATABASE',
            useFactory: (): Pool => DatabaseModule.createDatabasePool('AUTH')
        },
        {
            provide: 'WEB_DATABASE',
            useFactory: (): Pool => DatabaseModule.createDatabasePool('WEB')
        }
    ],
    exports: ['AUTH_DATABASE', 'WEB_DATABASE']
})
export class DatabaseModule
{
    private static createDatabasePool(poolName: string): Pool
    {
        const logger = new Logger(poolName);

        const poolConfig: PoolConfig =
        {
            host: process.env[`${ poolName }_DATABASE_HOST`],
            port: parseInt(process.env[`${ poolName }_DATABASE_PORT`], 10),
            database: process.env[`${ poolName }_DATABASE_NAME`],
            user: process.env[`${ poolName }_DATABASE_USERNAME`],
            password: process.env[`${ poolName }_DATABASE_PASSWORD`]
        };

        const pool = new Pool(poolConfig);

        pool.on('error', (error) =>
        {
            logger.error(`Unexpected error on idle client: ${ error }`);
        });

        pool.on('connect', () =>
        {
            logger.log('Database client connected');
        });

        pool.on('remove', () =>
        {
            logger.log('Database client removed from pool');
        });

        return pool;
    }
}
