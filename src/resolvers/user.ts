import User from '../models/User';
import { AuthenticationError } from 'apollo-server';

export const userResolvers = {
	chatGroups: async (
		parent: any,
		args: any,
		context: Services.ServerContext
	) => {
		context.logger.info('Query user args');

		const { chatGroups } = await User.query()
			.where({
				id: parent.id
			})
			.withGraphFetched({ chatGroups: true })
			.first();

		return chatGroups;
	}
};

export const user = async (
	parent: any,
	args: Resolvers.QueryUserArgs,
	context: Services.ServerContext
): Promise<Resolvers.User> => {
	const { id } = args;

	const user = await User.query().where({ id }).first();

	return user;
};
