import { AuthenticationError } from 'apollo-server-errors';
import { v4 } from 'uuid';
import AdminModel from '../models/AdminModel';
import { Authentication, signJWT } from '../Services/Authentication';

export const createAdmin = async (
	parent: any,
	args: Resolvers.MutationCreateAdminArgs,
	context: Services.ServerContext
): Promise<Resolvers.Admin> => {
	if (context.authenticated) {
		throw new Error('User already authenticated');
	}

	const { name, username, email, password, pin } = args.admin;

	const foundEmail = await await AdminModel.query().where({ email }).first();

	if (foundEmail) {
		throw new Error('Email aready in use!');
	}

	const key = v4().slice(0, 5);

	const admin = await AdminModel.query().insertAndFetch({
		email,
		created_at: new Date().toString(),
		password: await new Authentication(password).hashPassword(),
		pin,
		username,
		verified: false,
		name,
		key
	});

	return admin;
};

export const adminLogin = async (
	parent: any,
	args: Resolvers.MutationAdminLoginArgs,
	context: Services.ServerContext
): Promise<Resolvers.LoginReturn> => {
	if (context.authenticated) {
		throw new Error('Already logged in');
	}

	const { email, username, password, pin } = args.credentials;

	context.logger.warn(
		`Resolvers: Mutation: AuthLogin: trying to login with the following credentials:\nUsername: ${username}\nEmail: ${email}`
	);

	let primaryCredential: {
		type: 'USERNAME' | 'EMAIL' | 'NONE';
		value: string;
	} = username
		? { type: 'USERNAME', value: username }
		: { type: email ? 'EMAIL' : 'NONE', value: email ? email : '' };

	let userToLogin: AdminModel | undefined = undefined;

	if (primaryCredential.type === 'EMAIL') {
		userToLogin = await AdminModel.query().where({ email }).first();
	}
	if (primaryCredential.type === 'USERNAME') {
		userToLogin = await AdminModel.query()
			.where({
				username
			})
			.first();
	}

	if (!userToLogin) {
		throw new AuthenticationError(
			'Unable to login user. Invalid Credentials'
		);
	}

	const verified = await new Authentication(
		userToLogin.password
	).verifyPassword(password);

	if (!verified && pin !== userToLogin.pin) {
		throw new AuthenticationError(
			'Unable to login user. Invalid Credentials'
		);
	}

	context.session = {
		userId: userToLogin.id,
		username: userToLogin.username
	};
	const jwt = await signJWT(context);

	if (!jwt) {
		throw new AuthenticationError('No Validation Created');
	}

	context.response.setHeader('Authorization', jwt);
	return {
		authenticated: true,
		token: jwt
	};
};
