import 'reflect-metadata';
import { PollyDataSource } from './PollyDataSource/PollyDataSource';

export const appDataSource = new PollyDataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'postgres',
	synchronize: true,
	logging: false,
	entities: ['src/db/entities/**/*.js'],
	migrations: ['src/db/migrations/**/*.js'],
	subscribers: ['src/db/subscriber/**/*'],
});
