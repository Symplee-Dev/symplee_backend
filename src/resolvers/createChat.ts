import Chat from '../models/Chat';
import ChatUsers from '../models/ChatUsers';

export const createChat = async (
	parent: any,
	args: Resolvers.MutationCreateChatArgs,
	context: Services.ServerContext
): Promise<Resolvers.Chat> => {
	const { name, isPublic, userId, icon, chatGroupId, mode } = args.chat;

	context.logger.info('Trying to create chat with name: ' + name);

	const created = await Chat.query().insertAndFetch({
		name,
		isPublic,
		createdById: userId,
		icon,
		chatGroupId,
		mode
	});

	const createdRelation = await ChatUsers.query().insertAndFetch({
		userId: userId,
		chatId: created.id
	});

	if (!created || !createdRelation) {
		context.logger.err('Error created chat');
		throw new Error('Could not create group. Try again later.');
	}

	return created;
};
