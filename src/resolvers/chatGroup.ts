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

export const updateChatGroup = async (
	parent: any,
	args: Resolvers.MutationUpdateChatGroupArgs,
	context: Services.ServerContext
) => {
	context.logger.info('Updating chat group');

	const edited = await ChatGroup.query().patchAndFetchById(args.chatGroupId, {
		...args.group
	});

	if (!edited) {
		context.logger.err(
			'Error updating chat group with id of ' + args.chatGroupId
		);
		throw new Error('Unable to update chat group. Try again later.');
	}

	return edited;
};
