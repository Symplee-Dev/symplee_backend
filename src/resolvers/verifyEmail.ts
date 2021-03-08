import jwtDecode from 'jwt-decode';
import User from '../models/User';
import { Config } from '../index';
import { AuthenticationError } from 'apollo-server';

export const verifyEmail = async (
	parent: any,
	args: Resolvers.MutationVerifyEmailArgs,
	context: Services.ServerContext
): Promise<boolean> => {
	const { token } = args;

	const decoded: { secret: string; userId: number } = jwtDecode(token);

	if (decoded.secret !== Config.SESSION_SECRET)
		throw new AuthenticationError('Variables Invalid.');

	const user = await User.query().where({ id: decoded.userId }).first();

	context.logger.info(user.id, decoded.userId);

	if (!user) throw new Error('User does not exist');

	await User.query()
		.where({ id: decoded.userId })
		.first()
		.patch({ verified: true });

	if (!decoded) {
		context.logger.err('Unable to decode JWT');
		throw new Error('Unable to decode JWT');
	}

	return true;
};
