import { pubsub } from '../index';
import { logger } from '../utils/logger';
const { withFilter } = require('apollo-server');

export const messageSent = {
	subscribe: withFilter(
		() => pubsub.asyncIterator('MESSAGE_SENT'),
		(
			payload: { chatGroupId: number; message: string },
			variables: Resolvers.SubscriptionMessageSentArgs
		) => {
			logger.info(payload);
			logger.info(variables);
			return payload.chatGroupId === variables.chatGroupId;
		}
	),
	resolve: (value: { chatGroupId: number; message: string }) => value.message
};
