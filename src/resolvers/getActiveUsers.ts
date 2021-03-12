import { isSelectionNode } from 'graphql';
import { withFilter } from 'graphql-subscriptions';
import { pubsub } from '..';
import ChatUsers from '../models/ChatUsers';
import User from '../models/User';
import { logger } from '../utils/logger';
import { user } from './user';

const isUserActive = async (id: number): Promise<boolean> => {
	return (await User.query().findById(id).first()).is_online;
};

//TODO: Finish Subscription: filter ChatUsers for
export const activeChatUsers = {
	subscribe: withFilter(
		() => pubsub.asyncIterator('ACTIVE_CHAT_USERS'),
		async (
			payload: {
				user: { userId: number; isOnline: boolean; chatId: number };
			},
			variables: Resolvers.SubscriptionActiveChatUsersArgs
		) => {
			logger.info('payload in filter' + payload);
			logger.info('variable in filter' + variables);

			return variables.chatId === payload.user.chatId
				? payload.user.isOnline
				: false;
		}
	),
	resolve: (value: { userId: number; isOnline: boolean; chatId: number }) => {
		logger.info('value from resolver' + value);
		return { userId: value.userId, isOnline: value.isOnline };
	}
};
