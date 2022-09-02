import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'postgres',
	synchronize: true,
	logging: false,
	entities: ['src/db/entities/**/*.ts'],
	migrations: ['src/db/migrations/**/*.ts'],
	subscribers: ['src/db/subscriber/**/*.ts'],
});
