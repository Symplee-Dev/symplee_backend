import AppFeedback from '../models/AppFeedback';
import { Sanitizer } from '../utils/Cleaner';

export const sendFeedback = async (
	parent: any,
	args: Resolvers.MutationSendFeedbackArgs,
	context: Services.ServerContext
): Promise<Resolvers.AppFeedback> => {
	const { userEmail, userName } = args.feedback;

	context.logger.info(
		'Trying to send feedback from: ' + userName ?? userEmail
	);

	const sanitizer = new Sanitizer(args.feedback);

	const created = await AppFeedback.query().insertAndFetch(
		sanitizer.checkAll()
	);

	if (!created) {
		context.logger.err('Error inserting feedback');
		throw new Error(
			'Could not send feedback. Reach out legendarycomedy1@gmail.com'
		);
	}

	return created;
};
