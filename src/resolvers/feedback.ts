import { visitFunctionBody } from 'typescript';
import AppFeedback from '../models/AppFeedback';
import { EmailService } from '../Services/Email';
import { Sanitizer } from '../utils/Cleaner';

export const deleteFeedback = async (
	parent: any,
	args: Resolvers.MutationDeleteFeedbackArgs,
	context: Services.ServerContext
): Promise<boolean> => {
	const { id } = args;

	if (typeof id !== 'number') {
		throw new Error('ID is not compatible');
	}

	const feedbackToDelete = AppFeedback.query().findById(id);

	if (!feedbackToDelete) {
		throw new Error('Nothing to delete or invalid feedback id');
	}

	feedbackToDelete.delete();

	return true;
};

export const toggleFeedbackResolved = async (
	parent: any,
	args: Resolvers.MutationToggleFeedbackResolvedArgs,
	context: Services.ServerContext
): Promise<Resolvers.AppFeedback> => {
	const { id, status } = args;

	context.logger.info(`Toggling Resolved/Not Resolved for Feedback ID ${id}`);

	const feedback = await AppFeedback.query().updateAndFetchById(id, {
		resolved: !status
	});
	return feedback;
};

export const getFeedback = async (
	parent: any,
	args: {},
	context: Services.ServerContext
): Promise<Resolvers.AppFeedback[]> => {
	context.logger.info('Getting All Feedback');

	const feedbackList = await AppFeedback.query();
	return feedbackList;
};

export const feedbackById = async (
	parent: any,
	args: Resolvers.QueryFeedbackByIdArgs,
	context: Services.ServerContext
): Promise<Resolvers.AppFeedback> => {
	const { id } = args;

	context.logger.info('Getting All Feedback');

	const feedback = await AppFeedback.query().findById(id);

	return feedback;
};

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
