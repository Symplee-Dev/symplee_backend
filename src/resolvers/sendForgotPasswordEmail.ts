import AdminModel from '../models/AdminModel';
import User from '../models/User';
import { EmailService } from '../Services/Email';

// TODO: UPDATE LINK FOR PRODUCTION
const LINK_TO =
	process.env.NODE_ENV === 'production'
		? ''
		: 'http://localhost:3000/reset/verify';

export const sendForgotPasswordEmail = async (
	parent: any,
	args: Resolvers.MutationSendForgotPasswordEmailArgs,
	context: Services.ServerContext
): Promise<boolean> => {
	const { email, origin } = args;

	if (!origin) {
		throw new Error('Unknown Origin');
	}

	const sendEmail = async (id: number): Promise<boolean> => {
		const service = new EmailService(context);
		const token = await service.generateEmailJWT(id);
		return await service.sendPlainEmail(
			email,
			'Password Reset',
			'Please click the link below to reset your password',
			'<h3>Reset Password Link</h3> <a href="' +
				LINK_TO +
				'/' +
				token +
				'">Verify Email</a><br/><p>If there is trouble with the link, please copy and paste the link below into your favorite browser</p><br><p>' +
				LINK_TO +
				'/' +
				token
		);
	};

	if (origin === 'user') {
		const foundUser = await User.query().where({ email }).first();

		if (!foundUser) {
			throw new Error('No user found');
		}

		const sent = await sendEmail(foundUser.id);

		if (!sent) {
			throw new Error('Email Not Successfully Sent');
		}

		return sent;
	} else if (origin === 'admin') {
		const foundAdmin = await AdminModel.query().where({ email }).first();

		if (!foundAdmin) {
			throw new Error('No user found');
		}
		const sent = await sendEmail(foundAdmin.id);

		if (!sent) {
			throw new Error('Email Not Successfully Sent');
		}

		return sent;
	} else {
		throw new Error('Unknown Origin');
	}
};
