import { ApolloError, AuthenticationError } from 'apollo-server-errors';
import jwtDecode from 'jwt-decode';
import Chat from '../models/Chat';
import ChatGroup from '../models/ChatGroup';
import ChatUsers from '../models/ChatUsers';
import MessagesChats from '../models/MessagesChats';
import { pubsub } from '../index';
import { withFilter } from 'graphql-subscriptions';
import { logger } from '../utils/logger';

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

export const getUsersChatsByGroupID = async (
	parent: any,
	args: Resolvers.QueryGetUsersChatsByGroupIdArgs,
	context: Services.ServerContext
): Promise<number[]> => {
	const groupId = args.groupID;
	const token = context.token;

	if (!groupId) {
		throw new ApolloError('No Group Id', '404');
	}

	if (!token) {
		throw new AuthenticationError('Not Authorized');
	}

	const decoded: { userId: number } = jwtDecode(token);

	if (!decoded || !decoded.userId) {
		throw new AuthenticationError('Not Authorized');
	}

	const groupChats = await ChatGroup.query().where({ id: groupId });

	context.logger.info('GroupChats >>> ', groupChats);
	return [1, 2, 3];
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

export const userTyping = async (
	parent: any,
	args: Resolvers.MutationUserTypingArgs,
	context: Services.ServerContext
) => {
	context.logger.info('User typing start');

	pubsub.publish('USER_TYPING', { ...args });

	return true;
};

export const userTypingSubscription = {
	subscribe: withFilter(
		() => pubsub.asyncIterator('USER_TYPING'),
		(
			payload: { chatId: number; userId: number; username: string },
			variables: Resolvers.SubscriptionUserTypingArgs
		) => {
			logger.info('User typing with id ' + payload.userId);

			return payload.chatId === variables.chatId;
		}
	),
	resolve: (value: { chatId: number; userId: number; username: string }) =>
		value
};
