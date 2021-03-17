import { pubsub } from '..';
import { logger } from '../utils/logger';
import MessagesChats from '../models/MessagesChats';
import jwtDecode from 'jwt-decode';
import { ApolloError, AuthenticationError } from 'apollo-server-errors';
import UserGroups from '../models/UserGroups';
import Chat from '../models/Chat';
import sendMailboxUpdate from '../utils/sendMailboxUpdate';
import ChatGroup from '../models/ChatGroup';
const { withFilter } = require('apollo-server');

const MESSAGE_LIST_LIMIT = 1000;

export const sendMessage = async (
	parent: any,
	args: Resolvers.MutationSendMessageArgs,
	context: Services.ServerContext
): Promise<boolean> => {
	context.logger.info('Sending message');

	const availableChat = await Chat.query().findById(args.message.chatId);

	if (!availableChat) {
		throw new ApolloError('No available chat room', '404');
	}

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

	const group = await ChatGroup.query()
		.findById(availableChat.chatGroupId)
		.withGraphFetched({ members: true });

	group.members.forEach(async m => {
		if ((m.id! += args.message.authorId)) {
			await sendMailboxUpdate({
				title:
					'New message in ' +
					`#${availableChat.name} (${group.name})`,
				body: message.body,
				goTo: '/group/' + group.id + '/chat/' + availableChat.id,
				userId: m.id
			});
		}
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

	const newMessage = await MessagesChats.query().patchAndFetchById(
		message.id,
		{ 
			body: message.body
		}
	);

	pubsub.publish('MESSAGE_EDITED', {
		chatId: newMessage.chatId,
		message: newMessage
	});

	return newMessage;
};

export const deleteMessage = async (
	parent: any,
	args: Resolvers.MutationDeleteMessageArgs,
	context: Services.ServerContext
): Promise<boolean> => {
	const id = args.messageId;
	const token = context.token;

	if (!id) {
		throw new ApolloError('Nothing to delete', '500');
	}

	if (!token) {
		throw new AuthenticationError('User is not authenticated');
	}

	const decoded: { userId: number } = jwtDecode(token);

	if (!decoded.userId) {
		throw new AuthenticationError('User is not authenticated');
	}

	const foundMessage = await MessagesChats.query().findById(id);

	if (!foundMessage) {
		throw new ApolloError('Nothing to delete', '500');
	}

	if (foundMessage.authorId !== decoded.userId) {
		throw new AuthenticationError(
			'User is not authorized to delete this message'
		);
	}

	try {
		await MessagesChats.query().deleteById(id);
		pubsub.publish('MESSAGE_DELETED', {
			chatId: foundMessage.chatId,
			messageId: foundMessage.id
		});
		return true;
	} catch (error) {
		throw new ApolloError('Something wrong happened', '500');
	}
};

export const messageEdited = {
	subscribe: withFilter(
		() => pubsub.asyncIterator('MESSAGE_EDITED'),
		(
			payload: { chatId: number; message: MessagesChats },
			variable: Resolvers.SubscriptionMessageEditedArgs
		) => {
			return (
				payload.chatId === variable.chatId ||
				variable.chatId === payload.message.chatId
			);
		}
	),
	resolve: (value: { chatId: number; message: MessagesChats }) => {
		return value.message;
	}
};

export const messageDeleted = {
	subscribe: withFilter(
		() => pubsub.asyncIterator('MESSAGE_DELETED'),
		(
			payload: { chatId: number; messageId: number },
			variable: Resolvers.SubscriptionMessageDeletedArgs
		) => {
			return payload.chatId === variable.chatId;
		}
	),
	resolve: (value: { chatId: number; messageId: number }) => {
		return value.messageId;
	}
};
