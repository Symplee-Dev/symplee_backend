import { ApolloError, AuthenticationError } from 'apollo-server-errors';
import jwtDecode from 'jwt-decode';
import Chat from '../models/Chat';
import ChatGroup from '../models/ChatGroup';
import ChatUsers from '../models/ChatUsers';
import MessagesChats from '../models/MessagesChats';

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

export const deleteChatChannel = async (
	parent: any,
	args: Resolvers.MutationDeleteChatChannelArgs,
	context: Services.ServerContext
): Promise<boolean> => {
	const id = args.chatChannelId;
	const token = context.token;

	if (!id) {
		throw new ApolloError('No chat to delete', '400');
	}

	if (!token || !context.authenticated) {
		throw new AuthenticationError('User is not authenticated');
	}

	const debugged: { userId: number } = jwtDecode(token);

	if (!debugged.userId) {
		throw new AuthenticationError('User is not authenticated');
	}

	const foundChatChannel = await Chat.query().findById(id);

	if (!foundChatChannel) {
		throw new ApolloError('No chat to delete', '500');
	}

	if (foundChatChannel.createdById !== debugged.userId) {
		throw new AuthenticationError(
			'User is not authorized to delete this chat'
		);
	}

	try {
		await ChatUsers.query().delete().where('chatId', id);
		await MessagesChats.query().delete().where('chatId', id);
		await Chat.query().deleteById(id);
		return true;
	} catch (error) {
		throw new ApolloError(error, '500');
	}
};
