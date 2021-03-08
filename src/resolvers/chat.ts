import ChatUsers from '../models/ChatUsers';

export const hasChat = async (
	parent: any,
	args: Resolvers.QueryHasChatArgs,
	context: Services.ServerContext
): Promise<boolean> => {
	const { userId, chatId } = args;

	context.logger.info('Query: User has chat resolver');

	const hasChat = ChatUsers.query()
		.where({ chatId: chatId, userId: userId })
		.first();

	if (!hasChat) {
		context.logger.err('User does not belong to chat');
		throw new Error('You do not have access to this chat!');
	}

	return true;
};
