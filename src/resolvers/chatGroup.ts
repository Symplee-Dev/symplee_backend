import ChatGroup from '../models/ChatGroup';

export const chatGroup = async (
	parent: any,
	args: Resolvers.QueryChatGroupArgs,
	context: Services.ServerContext
): Promise<Resolvers.ChatGroup> => {
	const { id } = args;

	context.logger.info('Query: ChatGroup resolver');

	const chatGroup = ChatGroup.query()
		.findById(id)
		.withGraphFetched({ chats: true });

	return chatGroup;
};
