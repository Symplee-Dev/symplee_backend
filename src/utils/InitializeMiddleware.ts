import cors from 'cors';
import morgan from 'morgan';
import e from 'express';
import dotenv from 'dotenv';
import { Config } from '../index';

const initializeMiddleware = (app: e.Application) => {
	app.use(cors());

	dotenv.config();

	if (process.env.NODE_ENV === 'development') {
		switch (Config.LOG_LEVEL) {
			case 'ALL':
				app.use(morgan('default'));
				break;
			case 'MINIMAL':
				app.use(morgan('dev'));
				break;
			default:
				'NONE';
				break;
		}
	}
};

export default initializeMiddleware;
