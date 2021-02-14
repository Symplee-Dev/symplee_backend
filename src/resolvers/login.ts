import User from '../models/User';
import { Authentication, signJWT } from '../Services/Authentication';
import { AuthenticationError } from 'apollo-server';

export const login = async (
	parent: any,
	args: Resolvers.MutationLoginArgs,
	context: Services.ServerContext
): Promise<Resolvers.LoginReturn> => {
	context.logger.info('Resolvers: Mutation: login');

	if (context.authenticated) {
		throw new Error('Already logged in');
	}

	const { email, username, password } = args.credentials;

	context.logger.warn(
		'Resolvers: Mutation: login: trying to login user with username: ' +
			username
	);

	let primaryCredential: {
		type: 'USERNAME' | 'EMAIL' | 'NONE';
		value: string;
	} = username
		? { type: 'USERNAME', value: username }
		: { type: email ? 'EMAIL' : 'NONE', value: email ? email : '' };

	let userToLogin: User | undefined = undefined;

	if (primaryCredential.type === 'EMAIL') {
		context.logger.info('Attempting to Logging user in by email');
		userToLogin = await User.query().where({ email }).first();
	}

	if (primaryCredential.type === 'USERNAME') {
		context.logger.info('Attempting to login user by username and key');
		userToLogin = await User.query()
			.where({
				username: username?.split('#')[0],
				key: username?.split('#')[1]
			})
			.first();
	}

	if (!userToLogin) {
		context.logger.err('Invalid Credentials in Login Mutation');
		throw new AuthenticationError(
			'Unable to login user. Invalid Credentials'
		);
	}

	const verified = await new Authentication(
		userToLogin.password
	).verifyPassword(password);

	if (!verified) {
		throw new AuthenticationError(
			'Unable to login user. Invalid Credentials'
		);
	}

	const jwt = await signJWT(context);

	if (!jwt) {
		throw new Authentication('Could not create JWT!');
	}

	return {
		authenticated: true,
		token: jwt
	};
};
