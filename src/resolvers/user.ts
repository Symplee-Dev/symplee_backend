import User from '../models/User';
import { AuthenticationError } from 'apollo-server';

export const userResolvers = {
	chatGroups: async (parent: any, context: Services.ServerContext) => {
		context.logger.info('User Resolvers: Chat Group resolver');

		if (!context.session?.userId || !context.authenticated) {
			throw new AuthenticationError('Not authenticated');
		}

		const { chatGroups } = await User.query()
			.where({
				id: context.session?.userId
			})
			.withGraphFetched({ chatGroups: true })
			.first();

		return chatGroups;
	}
};
