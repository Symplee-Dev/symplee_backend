import dotenv from 'dotenv';
import { logger } from './logger';

export const initializeConfig = (): Utilities.Config.ENV => {
	dotenv.config();

	console.log('Initializing Config');

	const config: Utilities.Config.ENV = {
		PORT: String(process.env.PORT) ?? '',
		DB_HOST: process.env.DB_HOST ?? '',
		DB_USERNAME: process.env.DB_USERNAME ?? '',
		DB_PASSWORD: process.env.DB_PASSWORD ?? '',
		DB_NAME: process.env.DB_NAME ?? '',
		LOG_LEVEL: process.env.LOG_LEVEL ?? '',
		SESSION_SECRET: process.env.SESSION_SECRET ?? ''
	};

	return config;
};
