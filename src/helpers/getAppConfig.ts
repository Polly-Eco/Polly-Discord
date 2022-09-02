import { DataSource } from 'typeorm';
import { appDataSource } from '../data-source';

export interface AppConfig {
	token: string;
	clientId: string;
	isUpdateRequired: boolean;
	appDataSource: DataSource;
}

export const getAppConfig = async (): Promise<AppConfig> => {
	const isDev = process.env.NODE_ENV === 'dev';
	const isUpdateRequired = (process.env.IS_UPDATE_REQUIRED ?? '') === 'true';
	if (isDev) {
		const token = process.env.NONPROD_TOKEN ?? '';
		const clientId = process.env.NONPROD_CLIENT_ID ?? '';
		return {
			token,
			clientId,
			isUpdateRequired,
			appDataSource,
		};
	}
	const token = process.env.PROD_TOKEN ?? '';
	const clientId = process.env.PROD_CLIENT_ID ?? '';
	return {
		token,
		clientId,
		isUpdateRequired,
		appDataSource,
	};
};
