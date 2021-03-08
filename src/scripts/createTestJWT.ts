import { logger } from '../utils/logger';
import { signJWT } from '../Services/Authentication';
import jwt from 'jsonwebtoken';
import { Config } from '../index';

const main = async () => {
	const JWTOptions: jwt.SignOptions = {
		expiresIn: '30d'
	};

	console.info('Creating JWT');

	const signed = await jwt.sign(
		{ userId: 1, username: 'NateTheDev' },
		'supersecret',
		JWTOptions
	);

	console.info(signed);
};

main();
