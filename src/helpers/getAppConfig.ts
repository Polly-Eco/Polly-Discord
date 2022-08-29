import { DataSourceOptions } from 'typeorm';
import { coinMigration } from '../db/migrations/tables';

export interface AppConfig {
    token: string;
    clientId: string;
    isUpdateRequired: boolean;
    options: DataSourceOptions;
}

export const getAppConfig = async (): Promise<AppConfig> => {
    const isDev = process.env.NODE_ENV === 'dev'; 
    const isUpdateRequired = (process.env.IS_UPDATE_REQUIRED ?? '') === 'true';
    const options: DataSourceOptions = {
        type: 'postgres',
        host: process.env.PGHOST ?? '',
        username: process.env.PGUSER ?? '',
        password: process.env.PGPASSWORD ?? '',
        port: Number(process.env.PGPORT) ?? 0,
        migrations: [coinMigration],
        entities: [],
        synchronize: true,
        logging: false,
    };
    if (isDev) {
        const token = process.env.NONPROD_TOKEN ?? '';
        const clientId = process.env.NONPROD_CLIENT_ID ?? '';
        return {
            token,
            clientId,
            isUpdateRequired,
            options,
        };
    }
    const token = process.env.PROD_TOKEN ?? '';
    const clientId = process.env.PROD_CLIENT_ID ?? '';
    return {
        token,
        clientId,
        isUpdateRequired,
        options,
    };
};