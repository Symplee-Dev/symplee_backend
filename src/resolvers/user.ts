import User from '../models/User';

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

export const updateUser = async (
	parent: any,
	args: Resolvers.MutationUpdateUserArgs,
	context: Services.ServerContext
): Promise<Resolvers.User> => {
	context.logger.info('Updating user');

	const edited = await User.query().patchAndFetchById(args.userId, args.user);

	if (!edited) {
		context.logger.err('Error updating user with id of ' + args.userId);
		throw new Error('Unable to update user. Try again later.');
	}

	return edited;
};
