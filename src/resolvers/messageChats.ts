import { pubsub } from '..';
import { logger } from '../utils/logger';
import MessagesChats from '../models/MessagesChats';
import jwtDecode from 'jwt-decode';
import { ApolloError, AuthenticationError } from 'apollo-server-errors';
import UserGroups from '../models/UserGroups';
const { withFilter } = require('apollo-server');

const MESSAGE_LIST_LIMIT = 50;

export const sendMessage = async (
	parent: any,
	args: Resolvers.MutationSendMessageArgs,
	context: Services.ServerContext
): Promise<boolean> => {
	context.logger.info('Sending message');

	const message = await MessagesChats.query()
		.insertAndFetch({
			...args.message,
			createdAt: new Date().toString()
		})
		.withGraphFetched({ author: true });

	pubsub.publish('MESSAGE_SENT', {
		chatId: args.message.chatId,
		message: message
	});

	return true;
};

export const messageSent = {
	subscribe: withFilter(
		() => pubsub.asyncIterator('MESSAGE_SENT'),
		(
			payload: { chatId: number; message: MessagesChats },
			variables: Resolvers.SubscriptionMessageSentArgs
		) => {
			logger.info(payload);
			logger.info(variables);
			return payload.chatId === variables.chatId;
		}
	),
	resolve: (value: { chatId: number; message: MessagesChats }) =>
		value.message
};

export const getMessages = async (
	parent: any,
	args: Resolvers.QueryGetMembersArgs,
	context: Services.ServerContext
): Promise<MessagesChats[]> => {
	const messages = MessagesChats.query()
		.where({ chatId: args.chatId })
		.orderBy('id', 'ASC')
		.limit(MESSAGE_LIST_LIMIT)
		.withGraphFetched({ author: true });

	return messages;
};

export const editMessage = async (
	parent: any,
	args: Resolvers.MutationEditMessageArgs,
	context: Services.ServerContext
): Promise<MessagesChats> => {
	const message = args.message;

	const token = context.token;

	if (!token) {
		throw new AuthenticationError('User is not verified');
	}

	if (!message?.id || !message.body) {
		throw new ApolloError('Nothing to edit', '500');
	}

	const decoded: { userId: number } = jwtDecode(token);

	if (!decoded.userId) {
		throw new AuthenticationError('User is not verified');
	}

	const foundMessage = await MessagesChats.query().findById(message.id);

	if (!foundMessage) {
		throw new ApolloError('Nothing to edit', '500');
	}

	if (decoded.userId !== foundMessage.authorId) {
		throw new AuthenticationError('User is not authorized to edit');
	}

	return await MessagesChats.query().patchAndFetchById(message.id, {
		body: message.body
	});
};
