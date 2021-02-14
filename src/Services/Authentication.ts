import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Config } from '../index';

export class Authentication {
	password: string;

	constructor(password: string) {
		this.password = password;
	}

	async hashPassword(): Promise<string> {
		const salt = await bcrypt.genSaltSync(10);

		return await bcrypt.hashSync(this.password, salt);
	}

	async verifyPassword(password: string) {
		return await bcrypt.compareSync(password, this.password);
	}
}

export const signJWT = async (
	session: Services.ServerContext
): Promise<string> => {
	const JWTOptions: jwt.SignOptions = {
		expiresIn: '30d'
	};

	const signed = await jwt.sign(session, Config.SESSION_SECRET, JWTOptions);

	session.logger.info('JWT Created', signed);

	return signed;
};
