import { v4 } from 'uuid';
import User from '../models/User';
import { Authentication } from '../Services/Authentication';
import { EmailService } from '../Services/Email';

const LINK_TO =
	process.env.NODE_ENV === 'production'
		? 'https://boltchat.app/auth/verify'
		: 'http://localhost:3000/auth/verify/';

export const signup = async (
	parent: any,
	args: Resolvers.MutationSignupArgs,
	context: Services.ServerContext
): Promise<Resolvers.User> => {
	context.logger.info('Resolvers: Mutation: signup');

	if (context.authenticated) {
		throw new Error('SERVER ERROR: User already authenticated');
	}

	const { email, name, username, password } = args.user;

	context.logger.warn(
		'Resolvers: Mutation: signup: trying to create user with username: ' +
			username
	);

	// Check if email exists
	const foundEmail = await User.query().where({ email }).first();

	if (foundEmail) {
		throw new Error('Email already in use!');
	}

	// TODO: Refactor
	const key = v4().slice(0, 5);

	const user = await User.query().insertAndFetch({
		email,
		name,
		username,
		password: await new Authentication(password).hashPassword(),
		key,
		createdAt: new Date().toString()
	});

	const sender = new EmailService(context);

	const token = await sender.generateEmailJWT(user.id);

	const sent = await sender.sendPlainEmail(
		user.email,
		'Thank you for signing up!',
		'Please Verify Your Email.',
		'<h3>Please Verify Your Email</h3> <br> <a href="' +
			LINK_TO +
			token +
			'">Verify Email</a>'
	);

	if (!sent) throw new Error('Error signing up user.');

	// Todo: Needs auth token

	context.logger.info('User created with id of', user.id);

	return user;
};
