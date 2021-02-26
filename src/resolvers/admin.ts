import { AuthenticationError } from 'apollo-server-errors';
import { date } from 'faker';
import jwtDecode from 'jwt-decode';
import { v4 } from 'uuid';
import AdminModel from '../models/AdminModel';
import { Authentication, signJWT } from '../Services/Authentication';
import { EmailService } from '../Services/Email';

export const admin = async (
	parent: any,
	args: any,
	context: Services.ServerContext
): Promise<Resolvers.Admin> => {
	if (!context.authenticated) {
		throw new Error('Not Authorized');
	}

	if (!context.token) {
		throw new Error('Not Authorized');
	}

	let user: number | undefined = context.session?.userId;

	context.logger.info('Admin User Info: ' + user);

	if (!user) {
		throw new Error('Not Authorized');
	}

	context.logger.info(`attempting to get admin id ${user}`);
	const admin = AdminModel.query().findById(user).first();

	if (!admin) {
		throw new Error('No Admin Found');
	}

	return admin;
};

export const createAdmin = async (
	parent: any,
	args: Resolvers.MutationCreateAdminArgs,
	context: Services.ServerContext
): Promise<Resolvers.NewAdmin> => {
	if (context.authenticated) {
		throw new Error('User already authenticated');
	}

	const { token, name, username, email, password, pin } = args.admin;

	const tokenValid: {
		name: string;
		email: string;
		iat: number;
		exp: number;
	} = jwtDecode(token);
	if (tokenValid.exp > Date.now()) {
		throw new Error('Token Invalid');
	}

	const foundEmail = await await AdminModel.query().where({ email }).first();

	if (foundEmail) {
		throw new Error('Email aready in use!');
	}
	const foundUsername = await await AdminModel.query()
		.where({ username })
		.first();

	if (foundUsername) {
		throw new Error('Username aready in use!');
	}

	const key = v4().slice(0, 5);

	const admin = await AdminModel.query().insertAndFetch({
		email,
		created_at: new Date().toString(),
		password: await new Authentication(password).hashPassword(),
		pin,
		username,
		verified: true,
		name,
		key
	});

	context.session = {
		userId: admin.id,
		username: admin.username
	};
	const jwt = await signJWT(context);

	if (!jwt) {
		throw new AuthenticationError('No Validation Created');
	}

	return { ...admin, token: jwt };
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

const LINK_TO =
	process.env.NODE_ENV === 'production'
		? 'https://admin.boltchat.app/auth/verify'
		: 'http://localhost:3000/auth/verify';

export const sendAdminInvite = async (
	parent: any,
	args: Resolvers.MutationSendAdminInviteArgs,
	context: Services.ServerContext
): Promise<boolean> => {
	const { admin } = args;

	if (!admin) {
		throw new Error('No Admin Details');
	}

	if (!admin.name || admin.name.replace(' ', '').length < 2) {
		throw new Error('Name Not Long Enough');
	}

	if (!admin.email || !admin.email.includes('@')) {
		throw new Error('Not a valid email');
	}

	// const foundEmail = await AdminModel.query()
	// 	.where({ email: admin.email })
	// 	.first();
	// if (foundEmail) {
	// 	throw new Error('Email Already Used!');
	// }

	const sender = new EmailService(context);

	const token = await sender.generateAdminEmailJWT(admin);

	const sent = await sender.sendPlainEmail(
		admin.email,
		'You have been selected for an admin role',
		'Please Verify Your Email.',
		'<h3>Please Verify Your Email</h3> <br> <a href="' +
			LINK_TO +
			'?token=' +
			token +
			'&name=' +
			admin.name.replace(' ', '+') +
			'&email=' +
			admin.email +
			'">Verify Email</a>'
	);

	if (!sent) {
		throw new Error('Error Sending Email');
	}

	return true;
};
