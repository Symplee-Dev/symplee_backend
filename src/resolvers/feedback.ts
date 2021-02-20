import { visitFunctionBody } from 'typescript';
import AppFeedback from '../models/AppFeedback';
import { EmailService } from '../Services/Email';
import { Sanitizer } from '../utils/Cleaner';

export const sendFeedback = async (
	parent: any,
	args: Resolvers.MutationSendFeedbackArgs,
	context: Services.ServerContext
): Promise<Resolvers.AppFeedback> => {
	const { userEmail, userName, body } = args.feedback;

	context.logger.info(
		'Trying to send feedback from: ' + userName ?? userEmail
	);

	const sanitizer = new Sanitizer(args.feedback);

	const created = await AppFeedback.query().insertAndFetch({
		...sanitizer.checkAll(),
		createdAt: new Date().toString()
	});

	await new EmailService(context, '').sendPlainEmail(
		userEmail,
		'We received your feedback!',
		'We will get back to you as soon as possible!',
		'<h1>We will get back to you soom!</h1> <br> <p>If you have more questions reach out to us at legendarycomedy1@gmail.com</p> <br> <h1>Transcript</h1> ' +
			body.toString()
	);

	if (!created) {
		context.logger.err('Error inserting feedback');
		throw new Error(
			'Could not send feedback. Reach out legendarycomedy1@gmail.com'
		);
	}

	return created;
};
