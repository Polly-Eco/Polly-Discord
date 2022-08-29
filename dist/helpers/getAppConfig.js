"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppConfig = void 0;
const getAppConfig = async () => {
    const isDev = process.env.NODE_ENV === 'dev';
    const isUpdateRequired = (process.env.IS_UPDATE_REQUIRED ?? '') === 'true';
    const options = {
        host: process.env.PGHOST ?? '',
        username: process.env.PGUSER ?? '',
        password: process.env.PGPASSWORD ?? '',
        // database: process.env.PGDATABASE ?? '',
        dialect: 'postgres',
        port: Number(process.env.PGPORT) ?? 0,
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
exports.getAppConfig = getAppConfig;
//# sourceMappingURL=getAppConfig.js.map